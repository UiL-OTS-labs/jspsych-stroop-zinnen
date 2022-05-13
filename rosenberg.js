import {jsPsych} from "./init-jspsych.js";
import * as global from "./globals.js";
import {chosen_group} from "./main.js";
import {PRE_ROSENBERG_INSTRUCTION} from "./instructions.js";

const PREAMBLE = "Kies één van de antwoorden onder de vragen hieronder.";

// Rosenberg self esteem survey questions
const QUESTION1  = `Over het geheel genomen ben ik tevreden met mijzelf`;
const QUESTION2  = `Soms denk ik dat ik nergens goed in ben.`;
const QUESTION3  = `Ik heb het idee dat ik een aantal goede kwaliteiten heb.`;
const QUESTION4  = `Ik kan dingen net zo goed als de meeste andere mensen.`;
const QUESTION5  = `Naar mijn gevoel heb ik niet veel om trots op te zijn.`;
const QUESTION6  = `Af en to voel ik mij absoluut nutteloos.`;
const QUESTION7  = `In vergelijking met anderen vind ik mijzelf even waardevol.`;
const QUESTION8  = `Ik zou willen dat ik meer respect voor mijzelf kon hebben.`;
const QUESTION9  = `Alles bij elkaar genomen heb ik sterk de indruk dat ik een mislukkeling ben.`;
const QUESTION10 = `Ik sta positief tegenover mezelf.`;

// The answer options
const OPTIONS = [
    "helemaal mee eens",
    "mee eens",
    "niet mee eens",
    "helemaal niet mee eens"
];

const map_to_score = {
    [OPTIONS[0]] : 1,
    [OPTIONS[1]] : 2,
    [OPTIONS[2]] : 3,
    [OPTIONS[3]] : 4,
}

const survey_rosenberg = {
    //type: 'survey-multi-choice',
    type: jsPsychSurveyMultiChoice,
    data: {
        uil_save : true,
        survey_data_flag : true
    },
    preamble : PREAMBLE,
    questions: [
        {
            prompt : QUESTION1,
            name : 'v1',
            options : OPTIONS,
            required :true,
            horizontal : true
        },
        {
            prompt : QUESTION2,
            name : 'v2',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION3,
            name : 'v3',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION4,
            name : 'v4',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION5,
            name : 'v5',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION6,
            name : 'v6',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION7,
            name : 'v7',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION8,
            name : 'v8',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION9,
            name : 'v9',
            options : OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : QUESTION10,
            name : 'v10',
            options : OPTIONS,
            required : true,
            horizontal : true
        }
    ],

    on_finish: function(data) {
        let response = data.response;
        let score = {};
        let recoded = {};
        let recode_keys = ["v1", "v3", "v4", "v7", "v10"];
        for (let key in response) {
            score[key] = map_to_score[response[key]];
        }
        for (const [key, value] of Object.entries(score)) {
            if (recode_keys.includes(key)) {
                recoded[key] = 5 - value;
            }
            else {
                recoded[key] = value;
            }
        }
        data.score = score;
        data.recoded = recoded;
        let sum = 0;
        Object.values(recoded).forEach(value => sum += value);
        data.sum = sum;
        data.uil_save = true;
    }
};

let rosenberg_instruction = {
    type: jsPsychHtmlKeyboardResponse,
    choices : [" "],
    stimulus : PRE_ROSENBERG_INSTRUCTION
}

export let if_rosenberg= {
    timeline : [
        rosenberg_instruction,
        survey_rosenberg
    ],
    conditional_function : function () {
        return global.ROSENBERG_GROUPS.includes(chosen_group);
    }
};

