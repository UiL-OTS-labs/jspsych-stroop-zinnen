
// IMPORTANT
// Access key, this must be modified.
// You will get this id when you have requested an experiment on
// the data storage server.
// If you do not fill out a valid key, the participant's
// browser will not be able to upload the data to the server.
// Replace this by a PERFECT COPY of the key from the data server.
export const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';

//RANDOMIZATION

// Whether or not to pseudorandomize the test items
export const PSEUDO_RANDOMIZE = true;
// The maximum number of items with a similar itemtype in a row
export const MAX_SUCCEEDING_ITEMS_OF_TYPE = 2;

// This defines the dimensions of the canvas on which
// the sentences are drawn. Keep in mind, that you'll exclude
// participants with a low screen resolution when you set this too
// high.
export const MIN_WIDTH = 1000;
export const MIN_HEIGHT = 600;

// The default color (for words that don't require a response)
export const DEFAULT_COLOR = "white";

export const USED_COLORS = [
    "rood",
    "groen",
    "blauw",
    "geel"
];

export let RESPONSE_KEYS = ["1", "2", "9", "0"];

// The ISI will be added after each trial/stimulus
export const ISI_DUR = 150; //ms

// Fragments of text to display on buttons
export const YES_BUTTON_TEST = "yes"
export const NO_BUTTON_TEST = "no"
export const OK_BUTTON_TEXT = "ok";
export const TRUE_BUTTON_TEXT = "true";
export const FALSE_BUTTON_TEXT = "false";
export const CONTINUE_BUTTON_TEXT = "continue";
export const CORRECT_BUTTON_TEXT = "correct";
export const INCORRECT_BUTTON_TEXT = "incorrect";

// The key to use when continueing after an instruction.
export const CONTINUE_KEY = " ";

// The duration in ms for how long the finished instruction
// is on screen.
export const FINISH_TEXT_DUR = 30000;

// Stores the correct response for a given color.
export let correct_responses = undefined;
export function set_correct_responses(color_table) {
    correct_responses = color_table;
}

// A list of mappings between colors and desired responses.
// one of these will be 
export const LIST_CORRECT_RESPONSES = [
    {
        red     : "1",
        green   : "2",
        blue    : "9",
        yellow  : "0"
    },
    {
        yellow  : "1",
        blue    : "2",
        green   : "9",
        red     : "0"
    }
]

// Translation table to turn English color codes into Dutch
export const COL_TRANS = {
    "red"   : "rood",
    "green" : "groen",
    "blue"  : "blauw",
    "yellow": "geel",
};

export const FEEDBACK_DURATION = 1000;

// The percentage correct responses required in order to advance
// from practice to test phase.
export const REQ_PRAC_CORRECT = 75;

// The table in stimuli.js should be repeated a number of times.
// Since there are a number of repetition before and after a pause
// it should be divisible by 2 without remainder.
export const NUM_REPETITIONS = 2;

// Whether to run the rosenberg survey.
export const RUN_ROSENBERG = true;