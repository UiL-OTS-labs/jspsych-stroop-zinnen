"use strict";

/**
 * A small class to keep track of how well a participant performs the
 * practice phase of the experiment
 */
class PracticeStats {

    /**
     * Create a new PracticeStats instance.
     *
     * @param {number} req_percentage - The minimal percentage that is required in order
     *                                  to continue to the test phase of an experment.
     */
    constructor(req_percentage) {

        if (typeof req_percentage !== 'number')
            throw TypeError('req_percentage should be numberic.');

        if (req_percentage < 0 || req_percentage >= 100)
            throw new RangeError('The valid range is: 0 <= req_percentage < 100');

        this.percentage = req_percentage;
        this.results = [];
    }

    /**
     * Resets the instance.
     */
    reset() {
        this.results.length = 0;
    }

    /**
     * Append the (in)correct answer to the list of results.
     *
     * @param {boolean} Whether or not the participant answered last trial correctly.
     */
    appendResult(correct) {
        if (typeof correct !== 'boolean')
            throw TypeError('correct should be a boolean');
        this.results.push(correct);
    }

    /**
     * Calculate the percentage correctness for the obtained results, notice that at least
     * the correctness of one trial should be appended in order to calculate the correctness.
     *
     * @return {number} the percentage of correct responses.
     */
    percentageCorrect() {
        if (this.results.length === 0)
            return undefined;
        let sum = 0;
        this.results.forEach(
            function(correct) {
                if (correct)
                    sum += 1;
            }
        );
        return sum / this.results.length * 100;
    }

    /**
     * Returns whether or not the participant did the practice phase well enough.
     *
     * @return {boolean} true if the percentage correct >= to the required
     *                   percentage false otherwise.
     */
    practicePassed() {
        if (this.results.length === 0)
            return false;
        return this.percentageCorrect() >= this.percentage;
    }
}


