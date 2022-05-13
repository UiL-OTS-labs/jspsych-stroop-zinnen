import {jsPsych} from "./init-jspsych.js";
import * as global from "./globals.js";
import {FINISHED_REJECTION} from "./instructions.js";
// global repeat boolean
// If the survey is filled out incorrectly the questionaire
// is repeated.
let repeat_survey = false;

// 1th survey question

const AGE_PROMPT = "<p>Vul alsjeblieft onderstaande velden in:</p>";
const AGE_HTML = `
    <label for="age">Wat is je leeftijd in jaren? </label>
    <input type="number" id="age" 
        name="age" value=17 min=0 max=200 required>
    <span class="validity"></span>
    <br>
    <br>
    `;

const survey_1 = {
    type :      jsPsychSurveyHtmlForm,
    data: {
        uil_save : true,
        survey_data_flag: true
    },
    preamble :  AGE_PROMPT,
    html :      AGE_HTML,

    // flatten json output
    on_finish : function(data) {
        data.rt = Math.round(data.rt);
    }
};


// 2nd survey question

const NATIVE_QUESTION = `
    Is Nederlands je moedertaal of een van je moedertalen?
    `;
const NATIVE_OPTIONS = ["Nee", "Ja"];

const BILINGUAL_QUESTION = `
    Ben je   
    <a href="https://nl.wikipedia.org/wiki/Meertaligheid" target="_blank">meertalig</a>
    opgevoed?
    `;
const BILINGUAL_OPTIONS = ["Nee", "Ja"];

const EDUCATION_QUESTION = `
    Wat is je hoogst genoten opleiding?
    `;
const EDUCATION_OPTIONS =
    ["Basisschool","Middelbare school", "MBO", "HBO", "Universiteit", "Doctoraat"];

const STUDENT_QUESTION = "Ben je student?";
const STUDENT_OPTIONS = ["Nee", "Ja"];

const DYSLEXIC_QUESTION = `Ben je 
    <a href="https://nl.wikipedia.org/wiki/Dyslexie" target="_blank">dyslectisch</a>?
    `;
const DYSLEXIC_OPTIONS = ["Nee", "Ja"];

const LANGDISORDER_QUESTION = `Ben je gediagnosticeerd met een  
    <a href="https://nl.wikipedia.org/wiki/Taalontwikkelingsstoornis" target="_blank">
    taalontwikkelingsstoornis
    </a>?
    `;
const LANGDISORDER_OPTIONS = ["Nee", "Ja"];

const SEX_QUESTION = `Wat is je geslacht?`;
const SEX_OPTIONS = ["Vrouwelijk", "Mannelijk", "Anders", "Zeg ik liever niet"];

const HAND_QUESTION = 'Welke hand heeft je voorkeur om mee te schrijven?';
const HAND_OPTIONS = ["Links", "Rechts"];

const COLOR_QUESTION = "Heb je last van kleurenblindheid?";
const COLOR_OPTIONS = ["Nee", "Ja"];

const DEVICE_QUESTION = 
    `Welk apparaat gebruik je op dit moment?
    (Je kunt dit experiment alleen op een PC of
    laptop met toetsenbord doen.)`;
const DEVICE_OPTIONS = ["PC of laptop met toetsenbord", "Anders"];

const OPERATING_QUESTION = 'Welk besturingssysteem gebruik je op dit moment?';
const OPERATING_OPTIONS = ["Microsoft Windows", "Apple macOS", "Linux", "Anders"];

const survey_2 = {
    type: jsPsychSurveyMultiChoice,
    data: {
        uil_save : true,
        survey_data_flag : true
    },
    questions: [
		{
            prompt : NATIVE_QUESTION,
            name : 'NativeLanguage',
            options : NATIVE_OPTIONS,
            required :true,
            horizontal : true
        },        
		{
            prompt : BILINGUAL_QUESTION,
            name : 'Multilingual',
            options : BILINGUAL_OPTIONS,
            required :true,
            horizontal : true
        },
		{
            prompt : EDUCATION_QUESTION,
            name : 'Education',
            options : EDUCATION_OPTIONS,
            required :true,
            horizontal : false
        },
		{
            prompt : STUDENT_QUESTION,
            name : 'Student',
            options : STUDENT_OPTIONS,
            required :true,
            horizontal : false
        },
        {
            prompt : DYSLEXIC_QUESTION,
            name : 'Dyslexic',
            options : DYSLEXIC_OPTIONS,
            required : true,
            horizontal : true
        },
		{
            prompt : LANGDISORDER_QUESTION,
            name : 'LanguageDisorder',
            options : LANGDISORDER_OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : SEX_QUESTION,
            name : 'Sex',
            options : SEX_OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : HAND_QUESTION,
            name : 'HandPreference',
            options : HAND_OPTIONS,
            required : true,
            horizontal : true
        },
        {
            prompt : COLOR_QUESTION,
            name : 'ColorBlindness',
            options : COLOR_OPTIONS,
            required : true,
            horizontal : true
        },
		{
            prompt : DEVICE_QUESTION,
            name : 'Device',
            options : DEVICE_OPTIONS,
            required : true,
            horizontal : true
        },
		{
            prompt : OPERATING_QUESTION,
            name : 'OperatingSystem',
            options : OPERATING_OPTIONS,
            required : true,
            horizontal : true
        }
    ],

    on_finish: function(data) {
        data.rt = Math.round(data.rt);
    }
};

let survey_review = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function(data){

        let survey_1_data= 
            jsPsych.data.get().last(2).values()[0].response;
        
        let survey_2_data = 
            jsPsych.data.get().last(1).values()[0].response;
        
        let age = survey_1_data.age;

        let nativelang = survey_2_data.NativeLanguage;
		let multilingual = survey_2_data.Multilingual;
		let education = survey_2_data.Education;
		let student = survey_2_data.Student;
        let dyslexic = survey_2_data.Dyslexic;
		let langdisorder = survey_2_data.LanguageDisorder;
        let sex = survey_2_data.Sex;
        let color = survey_2_data.ColorBlindness;
        let hand_pref = survey_2_data.HandPreference;
		let device = survey_2_data.Device;
		let operating = survey_2_data.OperatingSystem;

        return `
            <h1>Je antwoorden:</h1>

            <div><strong>age</strong>: ${age} </div>
            <div><strong>Moedertaal Nederlands</strong>: ${nativelang} </div>
            <div><strong>Meertalig opgevoed</strong>: ${multilingual} </div>
			<div><strong>Educatie</strong>: ${education} </div>
			<div><strong>Student</strong>: ${student} </div>
            <div><strong>Dyslectisch</strong>: ${dyslexic} </div>
			<div><strong>Taalontwikkelingsstoornis</strong>: ${langdisorder} </div>
            <div><strong>Geslacht</strong>: ${sex} </div>
            <div><strong>Kleurenblindheid</strong>: ${color} </div>
            <div><strong>Voorkeur voor hand</strong>: ${hand_pref} </div>
			<div><strong>Het apparaat dat je gebruikt</strong>: ${device} </div>
			<div><strong>Het besturingssysteem dat je gebruikt</strong>: ${operating} </div>
            <BR><BR>
            <p>Is deze informatie juist?</p>
            `;
    },
    choices: [
        global.INCORRECT_BUTTON_TEXT,
        global.CORRECT_BUTTON_TEXT
    ],
    response_ends_trial: true,
    on_finish: function(data) {
        // Repeat the survey if the participant finds the survey fields incorrect
        repeat_survey = this.choices[data.response] !== global.CORRECT_BUTTON_TEXT;
        data.rt = Math.round(data.rt);
    }
};


let rejection_end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: FINISHED_REJECTION,
    choices: [],
    trial_duration: 5000,
    on_finish: function() {
        // actually stop the experiment
        jsPsych.endExperiment()
    }
};

let survey_check_rejection = {
    timeline: [rejection_end_screen],

    // when the following function returns false, we skip the rejection screen
    conditional_function: function() {
        let last = jsPsych.data.get().last(3).values();
        let survey_2 = last[1].response;
        let survey_1 = last[0].response;
        let retval = false;

        // log all survey responses
        console.log(survey_1);
        console.log(survey_2);
        
        if (survey_1.age < 18) {
            console.log("age requirement not met");
            retval = true;
		}
		if (survey_2.NativeLanguage === NATIVE_OPTIONS[0]) {
			console.log("native language not Dutch");
			retval = true;
		}
        if (survey_2.Student === STUDENT_OPTIONS[0]) {
            console.log("geen student");
            retval = true;
        }
		if (survey_2.Dyslexic === "Ja") {
			console.log("has dyslexia");
			retval = true;
		}
		if (survey_2.LanguageDisorder === DYSLEXIC_OPTIONS[1]) {
			console.log("has language disorder");
			retval = true;
        }
        if (survey_2.ColorBlindness === COLOR_OPTIONS[1]) {
			console.log("has color blindness.");
			retval = true;
        }
        if (survey_2.HandPreference === HAND_OPTIONS[0]) {
            console.log("Not right handed.");
            retval = true;
        }
        if (survey_2.Sex !== SEX_OPTIONS[0]) {
            console.log("Not female.");
            retval = true;
        }
		if (survey_2.Device === DEVICE_OPTIONS[1]) {
			console.log("is not using a laptop or PC");
			retval = true;
        }
		return retval;
    }
};


let survey = {
    timeline : [
        survey_1,
        survey_2,
        survey_review,
    ],
    loop_function : function () {
        if (repeat_survey) {
            // clear last trials of the survey
            let collection = jsPsych.data.get();
            let trials = collection.values();
            trials.length = trials.length - this.timeline.length;
        }
        return repeat_survey;
    }
};

export let survey_procedure = {
    timeline : [
        survey,
        survey_check_rejection
    ]
}

