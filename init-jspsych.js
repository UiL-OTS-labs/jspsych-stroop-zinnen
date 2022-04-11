
export {jsPsych};

import * as global from "./globals.js"

const jsPsych = initJsPsych (
    {
        exclusions: {
            min_width : global.MIN_WIDTH,
            min_height : global.MIN_HEIGHT
        }
    }
);