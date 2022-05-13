import {jsPsych} from "./init-jspsych.js";
import * as global from "./globals.js";
import {chosen_group} from "./main.js";
import {INSTRUCTION_GROUPS, ROSENBERG_GROUPS} from "./globals.js";

// Keeps track whether or not consent has been given.
export let consent_given = false;

/*
 * This fragment of html will be displayed in the beginning of you experiment.
 * You should fillout the contents of your information letter here.
 * It is displayed as html, the current html should be replace with
 * your information letter.
 *
 * This is shown to groups 1 and 2
 */
const CONSENT_HTML_12 =
    '<H3>Group 1 of 2 </H3>' + // Weghalen en aanpassen instructie manipulatie variant
    "<p>" +
    '<b>Welkom bij het online experiment Het Bereden Paard 22-028-03!</b>' +
    "</p>" +
    '<p>'			+
    'Beste lezer,' +
    '</p>'		+
    '<p>'		+
    'Wij, Betül Boz, Marit Schilling, Ronja van Zijverden en Tess Wensink, zijn studenten '	+
    'aan de Universiteit Utrecht en nodigen je uit om deel te nemen aan ons onderzoek, dat '	+
    'wordt uitgevoerd binnen de faculteit Geesteswetenschappen van de Universiteit Utrecht. '	+
    'Dit wordt gedaan in het kader van de cursus Experimental Design and Data Analysis onder toezicht '	+
    'van dr. Iris Mulders, cursuscoördinator.' +
    '</p>'	+
    '<p>'	+
    '<b> 1.	Hoe wordt dit onderzoek uitgevoerd? </b>' +
    '</p>'	+
    '<p>'			+
    'Dit is een anoniem wetenschappelijk onderzoek dat online wordt uitgevoerd. ' +
    'Bij het onderzoek wordt je gevraagd om in stilte zinnen te lezen. Hierbij zal '  +
    'je leestijd worden gemeten. Voorafgaand aan het experiment zal gevraagd worden '  +
    'naar persoonlijke gegevens, verder gespecificeerd onder sectie 3 (Databeheer). ' +
    'Na de test worden nog enkele vragen gesteld over het experiment zelf. Het onderzoek ' +
    'duurt in totaal niet meer dan 20 minuten. Het is belangrijk dat je deelneemt aan het ' +
    'onderzoek op een laptop of PC met toetsenbord, omdat het niet goed werkt op een tablet ' +
    'of smartphone. Als je moedertaal niet Nederlands is, je een vorm van autisme, dyslexie ' +
    'of een taalontwikkelingsstoornis (TOS) hebt, dan kun je helaas niet deelnemen aan dit '  +
    'onderzoek. Het experiment wordt dan beëindigd en je gegevens worden niet opgeslagen.' +
    '</p>'		+
    '<p>'		+
    '<b>2.	Vrijwillige deelname en anonimiteit</b>' +
    '</p>'		+
    '<p>'		+
    'Deelname aan ons onderzoek is geheel vrijwillig. Alleen als je toestemming geeft, ' +
    'zullen je gegevens worden gebruikt voor ons onderzoek. Gedurende het onderzoek mag ' +
    'je op elk moment stoppen als je van gedachten verandert. Als je stopt, zal de data die ' +
    'tot dan toe is ingevoerd niet opgeslagen worden. De data wordt anoniem verzameld. Je naam, ' +
    'e-mailadres, IP-adres en tijd van afname worden niet geregistreerd.' +
    '</p>'	+
    '<p>'		+
    '<b>3.	Databeheer</b>' +
    '</p>'		+
    '<p>'		+
    'Voor dit experiment zullen we bepaalde gegevens van je gebruiken, namelijk je antwoorden '	+
    'op de vragen die we voor en na het experiment stellen en je resultaten tijdens het experiment. '	+
    'We slaan na het experiment de volgende gegevens op: je geboortemaand, geboortejaar, geslacht, '	+
    'opleidingsniveau, met welke hand je schrijft, het apparaat en het besturingssysteem dat je '	+
    'gebruikt voor het deelnemen aan het experiment, en je responstijden. Verder heb je aangegeven '	+
    'dat je Nederlands als moedertaal hebt en dat je geen dyslexie, TOS of autisme hebt. Deze gegevens ' 	+
    'zijn niet tot jou te herleiden. We zullen alleen meerkeuzevragen stellen. De gegevens zullen '	+
    'minstens tien jaar opgeslagen worden op een beveiligde server van de Universiteit Utrecht, '	+
    'waarbij ze eventueel beschikbaar zullen zijn voor gebruik door andere onderzoekers. Dit zal voor '	+
    'niet-commercieel gebruik zijn.' +
    '</p>'		+
    '<p>'		+
    '<b>4.	Goedkeuring van dit onderzoek</b>' +
    '</p>'		+
    '<p>'		+
    'De Facultaire Ethische Toetsingscommissie - Geesteswetenschappen (FETC-GW) van de Universiteit '	+
    'Utrecht heeft dit onderzoek goedgekeurd. Wanneer je een klacht hebt over de manier waarop dit '	+
    'onderzoek wordt uitgevoerd, dan kun je contact opnemen met de secretaris van de '	+
    'FETC-GW fetc-gw@uu.nl.' +
    '</p>'		+
    '<p>'		+
    '<b>5.	Toestemming</b>' +
    '</p>'		+
    '<p>'		+
    'Als je meer informatie wilt over dit onderzoek, kun je contact opnemen met dr. Iris Mulders '	+
    '(I.C.M.C.Mulders@uu.nl) of Tess Wensink (t.s.b.wensink@uu.nl).' +
    '</p>';

/*
 * This fragment of html will be displayed in the beginning of you experiment.
 * You should fillout the contents of your information letter here.
 * It is displayed as html, the current html should be replace with
 * your information letter.
 *
 * This is shown to groups 1 and 2
 */
const CONSENT_HTML_34 =
    '<H3>Group 3 of 4 </H3>' + // Weghalen en de rest aanpassen (Rosenberg variant)
    "<p>" +
        '<b>Welkom bij het online experiment Het Bereden Paard 22-028-03!</b>' +
	"</p>" +
	'<p>'			+
		'Beste lezer,' +
	'</p>'		+
	'<p>'		+
		'Wij, Betül Boz, Marit Schilling, Ronja van Zijverden en Tess Wensink, zijn studenten '	+
		'aan de Universiteit Utrecht en nodigen je uit om deel te nemen aan ons onderzoek, dat '	+
		'wordt uitgevoerd binnen de faculteit Geesteswetenschappen van de Universiteit Utrecht. '	+
		'Dit wordt gedaan in het kader van de cursus Experimental Design and Data Analysis onder toezicht '	+
		'van dr. Iris Mulders, cursuscoördinator.' +
	'</p>'	+
	'<p>'	+
		'<b> 1.	Hoe wordt dit onderzoek uitgevoerd? </b>' +
	'</p>'	+
	'<p>'			+
			'Dit is een anoniem wetenschappelijk onderzoek dat online wordt uitgevoerd. ' +
			'Bij het onderzoek wordt je gevraagd om in stilte zinnen te lezen. Hierbij zal '  +
			'je leestijd worden gemeten. Voorafgaand aan het experiment zal gevraagd worden '  +
			'naar persoonlijke gegevens, verder gespecificeerd onder sectie 3 (Databeheer). ' +
			'Na de test worden nog enkele vragen gesteld over het experiment zelf. Het onderzoek ' +
			'duurt in totaal niet meer dan 20 minuten. Het is belangrijk dat je deelneemt aan het ' +
			'onderzoek op een laptop of PC met toetsenbord, omdat het niet goed werkt op een tablet ' +
			'of smartphone. Als je moedertaal niet Nederlands is, je een vorm van autisme, dyslexie ' +
			'of een taalontwikkelingsstoornis (TOS) hebt, dan kun je helaas niet deelnemen aan dit '  +
			'onderzoek. Het experiment wordt dan beëindigd en je gegevens worden niet opgeslagen.' +
	'</p>'		+
	'<p>'		+
		'<b>2.	Vrijwillige deelname en anonimiteit</b>' +
	'</p>'		+
	'<p>'		+
			'Deelname aan ons onderzoek is geheel vrijwillig. Alleen als je toestemming geeft, ' +
			'zullen je gegevens worden gebruikt voor ons onderzoek. Gedurende het onderzoek mag ' +
			'je op elk moment stoppen als je van gedachten verandert. Als je stopt, zal de data die ' +
			'tot dan toe is ingevoerd niet opgeslagen worden. De data wordt anoniem verzameld. Je naam, ' +
			'e-mailadres, IP-adres en tijd van afname worden niet geregistreerd.' +
	'</p>'	+
	'<p>'		+
		'<b>3.	Databeheer</b>' +
	'</p>'		+
	'<p>'		+
			'Voor dit experiment zullen we bepaalde gegevens van je gebruiken, namelijk je antwoorden '	+
			'op de vragen die we voor en na het experiment stellen en je resultaten tijdens het experiment. '	+
			'We slaan na het experiment de volgende gegevens op: je geboortemaand, geboortejaar, geslacht, '	+
			'opleidingsniveau, met welke hand je schrijft, het apparaat en het besturingssysteem dat je '	+
			'gebruikt voor het deelnemen aan het experiment, en je responstijden. Verder heb je aangegeven '	+
			'dat je Nederlands als moedertaal hebt en dat je geen dyslexie, TOS of autisme hebt. Deze gegevens ' 	+
			'zijn niet tot jou te herleiden. We zullen alleen meerkeuzevragen stellen. De gegevens zullen '	+
			'minstens tien jaar opgeslagen worden op een beveiligde server van de Universiteit Utrecht, '	+
			'waarbij ze eventueel beschikbaar zullen zijn voor gebruik door andere onderzoekers. Dit zal voor '	+
			'niet-commercieel gebruik zijn.' +
	'</p>'		+
	'<p>'		+
		'<b>4.	Goedkeuring van dit onderzoek</b>' +
	'</p>'		+
	'<p>'		+
			'De Facultaire Ethische Toetsingscommissie - Geesteswetenschappen (FETC-GW) van de Universiteit '	+
			'Utrecht heeft dit onderzoek goedgekeurd. Wanneer je een klacht hebt over de manier waarop dit '	+
			'onderzoek wordt uitgevoerd, dan kun je contact opnemen met de secretaris van de '	+
			'FETC-GW fetc-gw@uu.nl.' +
	'</p>'		+
	'<p>'		+
		'<b>5.	Toestemming</b>' +
	'</p>'		+
	'<p>'		+
			'Als je meer informatie wilt over dit onderzoek, kun je contact opnemen met dr. Iris Mulders '	+
			'(I.C.M.C.Mulders@uu.nl) of Tess Wensink (t.s.b.wensink@uu.nl).' +
    '</p>';

/*
 * Debrieving given when the participant doesn't consent.
 */
const DEBRIEF_MESSAGE_NO_CONSENT = 
    "<h1>"                                          +
        "End of the experiment"                     +
    "</h1>"                                         +
    "<h2>"                                          +
        "No consent has been given."                +
    "</h2>";

const CONSENT_STATEMENT = 
    'Yes, I consent to the use of my answers for scientific research.';

const CONSENT_REFERENCE_NAME = 'consent';
const IF_REQUIRED_FEEDBACK_MESSAGE = 
    "You must check the box next to " + CONSENT_STATEMENT +
    "in order to proceed to the experiment.";

// Adds UU styling to the consent forms.
let CONSENT_HTML_STYLE_UU = `<style>
        body {
            background: rgb(246, 246, 246);
            font-family: "Open Sans","Frutiger",Helvetica,Arial,sans-serif;
            color: rgb(33, 37, 41);
            text-align: left;
        }

        p {
            line-height: 1.4; /* Override paragraph for better readability */
        }

        label {
            margin-bottom: 0;
        }

        h1, h2{
            font-size: 2rem;
        }

        h6 {
            font-size: 1.1rem;
        }

        /* Input styles */

        form > table th {
            padding-left: 10px;
            vertical-align: middle;
        }

        input, textarea, select {
            border-radius: 0;
            border: 1px solid #d7d7d7;
            padding: 5px 10px;
            line-height: 20px;
            font-size: 16px;
        }

        input[type=submit], input[type=button], button, .button, .jspsych-btn {
            background: #000;
            color: #fff;
            border: none;
            font-weight: bold;
            font-size: 15px;
            padding: 0 20px;
            line-height: 42px;
            width: auto;
            min-width: auto;
            cursor: pointer;
            display: inline-block;
            border-radius: 0;
        }

        input[type="checkbox"], input[type="radio"]
        {
            width: auto;
        }

        button[type=submit], input[type=submit], .button-colored {
            background: #ffcd00;
            color: #000000;
        }

        button[type=submit].button-black, input[type=submit].button-black {
            background: #000;
            color: #fff;
        }

        button a, .button a,
        button a:hover, .button a:hover,
        a.button, a.button:hover {
            color: #fff;
            text-decoration: none;
        }

        .button-colored a,
        .button-colored a:hover,
        a.button-colored,
        a.button-colored:hover {
            color: #000;
        }

        /* Table styles */
        table thead th {
            border-bottom: 1px solid #ccc;
        }

        table tfoot th {
            border-top: 1px solid #ccc;
        }

        table tbody tr:nth-of-type(odd) {
            background: #eee;
        }

        table tbody tr:hover {
            background: #ddd;
        }

        table tbody tr.no-background:hover, table tbody tr.no-background {
            background: transparent;
        }

        table tbody td, table thead th, table tfoot th {
            padding: 6px 5px;
        }

        /* Link styles */
        a {
            color: rgb(33, 37, 41);
            text-decoration: underline;
            transition: 0.2s ease color;
        }

        a:hover {
            transition: 0.2s ease color;
            color: rgb(85, 85, 95);
        }

        </style>
        `;

CONSENT_HTML_STYLE_UU = "";

// displays the informed consent page for groups 1 and 2
let consent_block_12 = {
    type: jsPsychSurveyMultiSelect,
    data : {uil_save : true},
    preamble: CONSENT_HTML_STYLE_UU + CONSENT_HTML_12,
    required_message: IF_REQUIRED_FEEDBACK_MESSAGE,
    questions: [
        {
            prompt: "", 
            options: [CONSENT_STATEMENT], 
            horizontal: true,
            required: false,  
            button_label: global.CONTINUE_BUTTON_TEXT,
            name: CONSENT_REFERENCE_NAME
        }
    ],
    on_finish: function(data) {
        let consent_choice = data.response;
        data.uil_save = true;
        data.consent_choice_response = consent_choice;
    }
};

// displays the informed consent page for groups 3 and 4
let consent_block_34 = {
    type: jsPsychSurveyMultiSelect,
    data : {uil_save : true},
    preamble: CONSENT_HTML_STYLE_UU + CONSENT_HTML_34,
    required_message: IF_REQUIRED_FEEDBACK_MESSAGE,
    questions: [
        {
            prompt: "",
            options: [CONSENT_STATEMENT],
            horizontal: true,
            required: false,
            button_label: global.CONTINUE_BUTTON_TEXT,
            name: CONSENT_REFERENCE_NAME
        }
    ],
    on_finish: function(data) {
        let consent_choice = data.response;
        data.uil_save = true;
        data.consent_choice_response = consent_choice;
    }
};

let if_consent_group_12 = {
    timeline : [consent_block_12],
    conditional_function : function () {
        return INSTRUCTION_GROUPS.includes(chosen_group);
    }
}

let if_consent_group_34 = {
    timeline : [consent_block_34],
    conditional_function : function () {
        return ROSENBERG_GROUPS.includes(chosen_group);
    }
}


// Is displayed when no consent has been given.
let no_consent_end_screen = {
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE_NO_CONSENT,
    choices: [],
    trial_duration: global.FINISH_TEXT_DUR,
    on_finish: function (data){
        jsPsych.endExperiment()
    }
};

// Tests wheter consent has been given.
// If no consent has been given, it displays the
// no_consent_screen and finishes the experiment asap.
//
let if_node_consent = {
    timeline: [no_consent_end_screen],
    conditional_function: function(data) {
        /**
         * Whether or not the participant gave consent.
         *
         * @returns {bool}
         */
        function ppGaveConsent()
        {
            let data = jsPsych.data.get();
            let consent_trial = data.trials[data.trials.length - 1]
            console.assert(consent_trial.trial_type === 'survey-multi-select');
            return consent_trial.response.consent.includes(CONSENT_STATEMENT);
        }

        let agreed_with_consent = ppGaveConsent();
        if (agreed_with_consent) {
            consent_given = true;
            return false;
        } else {
            return true;
        }
    }
}

export let consent_procedure = {
    timeline: [if_consent_group_12, if_consent_group_34, if_node_consent]
}

