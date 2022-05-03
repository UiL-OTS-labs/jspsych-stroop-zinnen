import {
    getPracticeItems,
    getTestItems,
    createTrialTimelines
} from "./stimuli.js";

import {jsPsych} from "./init-jspsych.js";
import * as global from "./globals.js";

import {
    setupInstructions,
    colorResponseTable,
    WELCOME_INSTRUCTION,
    PRE_PRACTICE_INSTRUCTION1,
    key_instruction,
    PRE_PRACTICE_INSTRUCTION3,
    PRE_TEST_INSTRUCTION,
    POST_TEST_INSTRUCTION,
    PREPARE_INSTRUCTION,
    FINISHED_NO_CONSENT,
    PAUSE_INSTRUCTION
} from "./instructions.js";

import PracticeStats from "./practice-stats.js";
import {consent_procedure, consent_given} from "./consent.js";
import {survey_procedure} from "./survey.js";
import {rosenberg_procedure} from "./rosenberg.js";

export {main};


function setupResponseKeys() {
    let indices = [0, 1];
    let shuffled = jsPsych.randomization.shuffle(indices);
    let index = shuffled[0];
    global.set_correct_responses(global.LIST_CORRECT_RESPONSES[index]);
}

/**
 * @param {[{}]}testitems
 * @param {PracticeStats|null} prac_stats
 * @return
 */
function getSentenceTimeline(testitems , prac_stats=null) {
    let timeline = [];
    console.assert(prac_stats instanceof PracticeStats || prac_stats === null);
    testitems.forEach((item) => {
        let words = item.sentence_timeline.slice(0, -1);
        let target = item.sentence_timeline.slice(-1)[0];
        const TRIAL_PART = "trial_part";
        const WORD = "word";
        const ISI = "isi";
        const TARGET = "target";

        words.forEach((word) => {
            let color = word.color;
            let stimulus = `<p class="word ${color}">${word.word}</p>`
            let present_word = {
                type : jsPsychHtmlKeyboardResponse,
                trial_duration : word.trial_duration,
                choices : [],
                stimulus : stimulus,
                on_finish : data => data.trial_part = WORD
            };
            timeline.push(present_word);
            timeline.push( // ISI
                {
                    type : jsPsychHtmlKeyboardResponse,
                    trial_duration : global.ISI_DUR,
                    choices : [],
                    stimulus : "",
                    on_finish : data => data.trial_part = ISI
                }
            );
        });

        let target_stimulus =
            `<p class="target ${target.color}">${target.word}</p>`;
        timeline.push(
            {
                type : jsPsychHtmlKeyboardResponse,
                choices : global.RESPONSE_KEYS,
                trial_duration : null,
                stimulus : target_stimulus,
                data : {
                    repetition : item.repetition,
                    id : item.id,
                },
                on_finish : function (data) {
                    data.trial_part = TARGET;
                    data.correct =
                        global.correct_responses[target.color] === data.response;
                    if (prac_stats) {
                        prac_stats.appendResult(data.correct);
                    }
                }
            }
        )
        if (prac_stats) {
            let feedback = {
                type : jsPsychHtmlKeyboardResponse,
                trial_duration : global.FEEDBACK_DURATION,
                stimulus : function () {
                    let last = jsPsych.data.getLastTrialData().values()[0];
                    let csscls = last.correct ? "correct" : "incorrect";
                    let feedback = last.correct ?
                        global.CORRECT_BUTTON_TEXT : global.INCORRECT_BUTTON_TEXT;
                    return `<p class="feedback ${csscls}">${feedback}</p>`;
                }
            }
            timeline.push(feedback);
        }
    })
    return timeline;
}


function main() {
    // Make sure you have updated your key in globals.js
    uil.setAccessKey(global.ACCESS_KEY);
    uil.stopIfExperimentClosed();

    createTrialTimelines();

    // Option 1: client side randomization:
    let stimuli = getTestItems();
    kickOffExperiment(stimuli, getTimeline(stimuli));

    // Option 2: server side balancing:
    // Make sure you have matched your groups on the dataserver with the
    // lists in stimuli.js.
    // This experiment uses groups/lists list1, and list2 by default (see
    // stimuli.js).
    // Hence, unless you change lists here, you should have created matching
    // groups there.
    // uil.session.start(ACCESS_KEY, (group_name) => {
    //     let stimuli = findList(group_name);
    //     kickOffExperiment(stimuli, getTimeline(stimuli));
    // });
}

function getTimeline(stimuli) {
    
    setupResponseKeys();
    setupInstructions();

    let welcome_screen = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : WELCOME_INSTRUCTION,
        choices : [global.CONTINUE_KEY],
        response_ends_trial : true
    };

    let instruction_screen_practice1 = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : PRE_PRACTICE_INSTRUCTION1,
        choices : [global.CONTINUE_KEY],
        response_ends_trial : true
    };

    let instruction_screen_practice2 = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : key_instruction,
        choices : [global.CONTINUE_KEY],
        response_ends_trial : true
    };

    let instruction_screen_practice3 = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : PRE_PRACTICE_INSTRUCTION3,
        choices : [global.CONTINUE_KEY],
        response_ends_trial : true
    };    

    let end_practice_screen = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : PRE_TEST_INSTRUCTION,
        choices : [global.CONTINUE_KEY],
        response_ends_trial : true
    };

    let end_experiment = {
        type : jsPsychHtmlKeyboardResponse,
        stimulus : POST_TEST_INSTRUCTION,
        choices : [],
        trial_duration : global.FINISH_TEXT_DUR,
        on_load : function () {
            if (consent_given) {
                let json = jsPsych.data.get().json();
                uil.saveJson(json);
            }
            else {
                document.body.innerHTML = FINISHED_NO_CONSENT;
            }
        }
    };

    let pstats = new PracticeStats(global.REQ_PRAC_CORRECT);

    let prepare_procedure = { // count down with a blank screen in the last iteration
        timeline : [
            {
                type : jsPsychHtmlKeyboardResponse,
                trial_duration : 500, // 0.5 seconds
                stimulus : function() {
                    let count = jsPsych.timelineVariable('count');
                    let html = "";
                    if (count > 0) {
                        html = PREPARE_INSTRUCTION + `<h1>${count}</h1>`
                    }
                    return html;
                }
            }
        ],
        timeline_variables : [
            {count : 4},
            {count : 3},
            {count : 2},
            {count : 1},
            {count : 0}
        ]
    };

    let practice_results = {
        type : jsPsychHtmlKeyboardResponse,
        choices : [global.CONTINUE_KEY],
        stimulus : function () {
            let html;
            if (pstats.practicePassed())
                html = '<p>Je had ' + pstats.percentageCorrect() +
                    '% correct. Je gaat nu door naar het volgende gedeelte.</p>';
            else
                html = '<p>You scored ' + pstats.percentageCorrect() +
                    '% correct. We zullen nog een keer oefenen';
            html += '<p>Druk op de spatiebalk om door te gaan.</p>'
            return html;
        }
    }

    let key_reminder = {
        type : jsPsychHtmlKeyboardResponse,
        choices : [global.CONTINUE_KEY],
        stimulus : function () {
            let html = "<h>Ter herinnering:</h>";
            html += "<p>";
            html += colorResponseTable();
            html += "</p>";
            html += "<p>Druk op de spatiebalk om verder te gaan.</p>";
            return html;
        }
    }

    let practice_timeline = getSentenceTimeline(
        getPracticeItems().table,
        pstats
    );
    let practice = {
        timeline : practice_timeline
    };

    let practice_loop = {
        loop_count : 0,
        timeline : [
            {
                timeline : [key_reminder],
                conditional_function : function () {
                    return practice_loop.loop_count > 0;
                }
            },
            prepare_procedure,
            practice,
            practice_results
        ],
        loop_function : function () {
            let result = pstats.practicePassed() === false;
            pstats.reset();
            practice_loop.loop_count += 1;
            return result;
        }
    }

    let stimuli_repeated = [];
    for (let i = 0; i < global.NUM_REPETITIONS; i++) {
        let stims = [];
        stimuli.table.forEach((stimulus) => {
            let clone;
            try {
                clone = structuredClone(stimulus);
            } catch (error)  {
                if (error instanceof ReferenceError) { // Old skool cloning.
                    clone = JSON.parse(JSON.stringify(stimulus));
                }
                else {
                    throw error;
                }
            }
            clone.repetition = i + 1;
            stims.push(clone);
        });

        if (global.PSEUDO_RANDOMIZE) {
            let shuffled = uil.randomization.randomizeStimuli(
                stims,
                global.MAX_SUCCEEDING_ITEMS_OF_TYPE
            );
            if (shuffled !== null)
                stims = shuffled;
            else
                console.error('Unable to shuffle stimuli according constraints.')
        }
        stimuli_repeated = stimuli_repeated.concat(stims);
    }

    let experimental_items_pre_pause = {
       timeline : getSentenceTimeline(
           stimuli_repeated.slice(0, stimuli_repeated.length/2),
           null
       )
    };

    let pause = {
        timeline : [
            {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: PAUSE_INSTRUCTION,
                choices: [" "]
            },
            prepare_procedure
        ]
    };

    let experimental_items_post_pause = {
        timeline : getSentenceTimeline(
            stimuli_repeated.slice(stimuli_repeated.length/2),
            null
        )
    };

    //////////////// timeline /////////////////////////////////
    let timeline = [];

    // Welcome the participant and guide them through the 
    // consent forms and survey.
    timeline.push(welcome_screen);

    // Obtain informed consent.
    timeline.push(consent_procedure);

    // add survey
    timeline.push(survey_procedure);
    
    // Add the different parts of the experiment to the timeline
    timeline.push(instruction_screen_practice1);
    timeline.push(instruction_screen_practice2);
    timeline.push(instruction_screen_practice3);

    timeline.push(practice_loop);
    timeline.push(end_practice_screen);
    timeline.push(prepare_procedure);
    timeline.push(experimental_items_pre_pause);
    timeline.push(pause);
    timeline.push(experimental_items_post_pause);

    timeline.push(rosenberg_procedure)
    timeline.push(end_experiment);

    return timeline
}

// this function will eventually run the jsPsych timeline
function kickOffExperiment(stimuli, timeline) {

    let subject_id = uil.session.isActive() ?
        uil.session.subjectId() : jsPsych.randomization.randomID(8);
    let practice_items = getPracticeItems().table;
    let test_items = stimuli.table;
    let list_name = stimuli.list_name;


    // data one would like to add to __all__ trials, according to:
    // https://www.jspsych.org/overview/data/
    jsPsych.data.addProperties (
        {
            subject : subject_id,
            list : list_name,
        }
    );
    
    // Start jsPsych when running on a Desktop or Laptop style pc.
    uil.browser.rejectMobileOrTablet();
    jsPsych.run(timeline)
}
