# jspsych-stroop
Strooptask using jspsych

## Description
This task is a general form of a STROOP task. Currently, It uses a CONGRUENT 
stimuli e.g. the word "red" in a reddish font type and INCONGRUENT e.g.
"blue" in a yellowish font type. Just like a regular font type. The general
flow is as follows:
- A participant is welcomed to the task
- The participant should agree with the informed consent form.
  - If the participant doesn't agree, the experiment terminates.
- Some general information (gender, age, etc.) is gathered from the participant
- The participant is instructed on how to do the strooptask
- The participant practices a number of trials
  - The participant should achieve a given percentage correct, otherwise
    the practice block repeats.
- The participant is given final instructions.
- The participant runs through all of the trials of the stroop task
- The data is stored on the data server and the experiment finishes.

Currently, there is support for multiple lists borrowed from the
[jspsych-spr-mw](https://github.com/UiL-OTS-labs/jspsych-spr-mw) experiment.
In the moving window experiment this is used to create a latin square.

## Generic documentation
Please read the [generic documentation](https://github.com/UiL-OTS-labs/jspsych-uil-template-docs)
for some context of the use of jsPsych in the UiL-OTS laboratories.

## Adapting the stroop task
In its current state the stroop task is a very short experiment, hence many stimuli
should be added. The stimuli to be presented are in three lists by default.
The practice items which every participant encounters and 2 sets of lists for
the test items: LIST_GROUP1 and LIST_GROUP2, one of these list is assigned
randomly to a participant. These lists can be extended so the experiment
gets some body. It should be quite easy to remove one list or add 
additional. For more info see the comments/documentation in stimuli.js.

### Update access key
In the file `globals.js` is a variable:
```javascript
const ACCESS_KEY = '00000000-0000-0000-0000-000000000000';
```
For uploading to the UiL-OTS data server you will need to change
this to the access_key that you obtained when your experiment
was approved. Your personal access key should look identical, but
with all the '0' changed. For elaborate info see `globals.js`.

For general information about the how to work with the UiL-OTS 
data and experiment server (UiL OTS student and employees only)
see: [online experimenting][3]

## Output
For some general information about understanding the output of jsPsych you
can visit the `README.md` of our [jspsych output][1] github page.

## License
This software is free software LICENSED under the GNU General Public License v3.0
for more details see the LICENSE file in the repository.

[1]:<https://github.com/UiL-OTS-labs/jspsych-output>
[2]:<https://www.jspsych.org/plugins/overview/#list-of-available-plugins>
[3]:<https://uilots-labs.wp.hum.uu.nl/how-to/online-experimenting/>
