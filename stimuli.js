import {jsPsych} from "./init-jspsych.js";

// Item types
const PRACTICE      = "PRACTICE";
const CONGRUENT     = "CONGRUENT";
const INCONGRUENT   = "INCONGRUENT";
const NEUTRAL       = "NEUTRAL";
const EMOTIONAL     = "EMOTIONAL";

// colors used for CSS properties, so don't translate
const WHITE = "white";
const BLACK = "black";
const RED = "red";
const GREEN = "green";
const YELLOW = "yellow";
const BLUE = "blue";

// Lists
// Add more lists here when necessary.
// remember to add an extra LIST_GROUPx array below
// to describe the stimuli for this list. You might
// also remove list2 for example to just use 1 list.
// also add this list to the TEST_ITEMS array below.
const LISTS = [
    "list1",
    "list2"
    // "list3"
];

const PRACTICE_ITEMS = [
    {
        id : 1,
        item_type : PRACTICE, // CONGRUENT,
        sentence : "De fiets is rood",
        color : RED
    },
    {
        id : 2,
        item_type : PRACTICE, // INCONGRUENT
        sentence : "De bal is rood",
        color : BLUE
    },
    {
        id : 3,
        item_type : PRACTICE, // CONGRUENT
        sentence : "Het gras is groen",
        color : GREEN,
    },
    {
        id : 4,
        item_type : PRACTICE, // INCONGRUENT
        sentence : "De auto is rood",
        color : YELLOW
    },
    {
        id : 5,
        item_type : PRACTICE, // NEUTRAL
        sentence :"Hij leest een boek",
        color : GREEN
    },
    {
        id : 6,
        item_type : EMOTIONAL,
        sentence : "Zij voelt zich verdrietig",
        color : BLUE
    }
];

/*
 * Stimuli in these lists are described by their:
 *  - id, it identifies which stimulus has been presented
 *  - item_type, it determines the condition of the stimulus.
 *     In the examples there are IN-, CONGRUENT, NEUTRAL and EMOTIONAL stimuli
 *  - sentence, the sentence is broken up in words and the last word requires
 *     a response and is presented in a target color.
 *  - color, The color of the last word, RED, GREEN, YELLOW or BLUE.
 */
const LIST_GROUP1 = [
    {
        id : 1,
        item_type : CONGRUENT,
        sentence : "De fiets is rood",
        color : RED
    },
    {
        id : 2,
        item_type : INCONGRUENT,
        sentence : "De lucht is rood",
        color : BLUE
    },
    {
        id : 3,
        item_type : CONGRUENT,
        sentence : "Het gras is groen",
        color : GREEN,
    },
    {
        id : 4,
        item_type : INCONGRUENT,
        sentence : "Geel is niet rood",
        color : YELLOW
    },
    {
        id : 5,
        item_type : NEUTRAL,
        sentence : "Hij eet met een vork",
        color : GREEN
    },
    {
        id : 6,
        item_type : EMOTIONAL,
        sentence : "Zij laat een traan",
        color : BLUE
    }
];

/*
 * In this list there is a stimulus, if a word starts with a '#' its
 * reaction time will be recorded. So don't put any '#" elsewhere...
 */
const LIST_GROUP2 = [
    {
        id : 1,
        item_type : INCONGRUENT,
        sentence : "De fiets is rood",
        color : BLUE, 
    },
    {
        id : 2,
        item_type : CONGRUENT,
        sentence : "De lucht is rood",
        color : RED 
    },
    {
        id : 3,
        item_type : INCONGRUENT,
        sentence : "Het gras is groen",
        color : RED,
    },
    {
        id : 4,
        item_type : CONGRUENT,
        sentence : "rood is niet geel",
        color : YELLOW
    },
    {
        id : 5,
        item_type : NEUTRAL,
        sentence : "Hij eet met een vork",
        color : YELLOW
    },
    {
        id : 6,
        item_type : EMOTIONAL,
        sentence : "Zij laat een traan",
        color : RED
    }
];

// Add a third list of stimuli when required.
// const LIST_GROUP3 = [
// ...
// ]

// This list can be use as a between subject variable
// e.g. GROUP1 gets a manipulation not present in
// GROUP2, these groups may also be used to create
// a latin square design
const TEST_ITEMS = [
    {list_name: LISTS[0], table: LIST_GROUP1},
    {list_name: LISTS[1], table: LIST_GROUP2}
    // Add a third list here, put a comma on the
    // end of the line above here.
    // {list_name: LISTS[1], table: LIST_GROUP3}
];

/**
 * Get the list of practice items
 *
 * Returns an object with a list and a table, the list will always indicate
 * "practice" since it are the practice items
 *
 * @returns {object} object with list_name and table fields
 */
export function getPracticeItems() {
    return {list_name : "practice", table : PRACTICE_ITEMS};
}

/**
 * This function will pick a random list from the TEST_ITEMS array.
 *
 * Returns an object with a list and a table, the list will always indicate
 * which list has been chosen for the participant.
 *
 * @returns {object} object with list_name and table fields
 */
export function pickRandomList() {
    let range = function (n) {
        let empty_array = [];
        let i;
        for (i = 0; i < n; i++) {
            empty_array.push(i);
        }
        return empty_array;
    }
    let num_lists = TEST_ITEMS.length;
    let shuffled_range = jsPsych.randomization.repeat(range(num_lists), 1);
    return TEST_ITEMS[shuffled_range[0]];
}

/**
 * This function walks over every item in the lists of stimuli. It creates
 * a timeline for every trial, where the first n words are presented
 * in a default color and the last is described in a
 */
export function createTrialTimelines() {

    function stimulusDuration(word) {
        console.assert(typeof word === "string");
        const BASE = 290;
        return BASE + word.length * 30;
    }

    function createTimeline (stimulus) {
        let timeline = [];
        console.assert(typeof stimulus.sentence === "string");
        let words = stimulus.sentence.split(/\s+/);
        console.assert(words.length > 1);
        let leading = words.slice(0, -1);
        let final = words.slice(-1);
        console.assert(words.length === leading.length + final.length);
        leading.forEach((word) => {
            timeline.push(
                {
                    word : word,
                    color : DEFAULT_COLOR,
                    trial_duration : stimulusDuration(word),
                    choices : [],
                }
            );
        });
        timeline.push(
            {
                word : final[0],
                color : stimulus.color,
                trial_duration : null, // Test stimulus, response required.
                choices : RESPONSE_KEYS
            }
        );
        return timeline;
    }

    PRACTICE_ITEMS.forEach((stimulus) => {
        stimulus.sentence_timeline = createTimeline(stimulus);
    });

    TEST_ITEMS.forEach((list) =>{
        list.table.forEach((stimulus) => {
            stimulus.sentence_timeline= createTimeline(stimulus);
        });
    });
}
