
// IMPORTANT
// Access key, this must be modified.
// You will get this id when you have requested an experiment on
// the data storage server.
// If you do not fill out a valid key, the participant's
// browser will not be able to upload the data to the server.
// Replace this by a PERFECT COPY of the key from the data server.
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';

//RANDOMIZATION

// Whether or not to pseudorandomize the test items
const PSEUDO_RANDOMIZE = true;
// The maximum number of items with a similar itemtype in a row
const MAX_SUCCEEDING_ITEMS_OF_TYPE = 2

// This defines the dimensions of the canvas on which
// the sentences are drawn. Keep in mind, that you'll exclude
// participants with a low screen resolution when you set this too
// high.
const MIN_WIDTH = 1000;
const MIN_HEIGHT = 600;

const USED_COLORS = [
    "rood",
    "groen",
    "blauw",
    "geel"
];

let RESPONSE_KEYS = ["1", "2", "9", "0"];

// The ISI will be added after each trial/stimulus
const ISI = 500; //ms

// Fragments of text to display on buttons
const YES_BUTTON_TEST = "yes"
const NO_BUTTON_TEST = "no"
const OK_BUTTON_TEXT = "ok";
const TRUE_BUTTON_TEXT = "true";
const FALSE_BUTTON_TEXT = "false";
const CONTINUE_BUTTON_TEXT = "continue";
const CORRECT_BUTTON_TEXT = "correct";
const INCORRECT_BUTTON_TEXT = "incorrect";

// The key to use when continueing after an instruction.
const CONTINUE_KEY = " ";

// The duration in ms for how long the finished instruction
// is on screen.
const FINISH_TEXT_DUR = 30000;

// Stores the correct reponse for a given color.
let correct_responses = undefined;

// A list of mappings between colors and desired responses.
// one of these will be 
const LIST_CORRECT_RESPONSES = [
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
const COL_TRANS = {
    "red"   : "rood",
    "green" : "groen",
    "blue"  : "blauw",
    "yellow": "geel"
};

const FEEDBACK_DURATION = 1000;

const WORD_FONT_FAM     = "DejavuSansMono";
const WORD_FONT_SIZE    = "50px";
const WORD_FONT_WEIGHT  = "bold";

// The percentage correct responses required in order to advance
// from practice to test phase.
const REQ_PRAC_CORRECT = 75;
