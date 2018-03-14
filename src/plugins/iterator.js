/**
 * @callback iteratorCallback
 * @param {*} cell - The value of the current cell.
 * @param {Array.<number>} position - The current position.
 * @param {gridl} gridlInstance - The current gridl instance.
 */

/**
 * @callback reducerCallback
 * @param {*} accumulator - The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied.
 * @param {*} cell - The value of the current cell.
 * @param {Array.<number>} position - The current position.
 * @param {gridl} gridlInstance - The current gridl instance.
 */

import gridl from '../index';
import { index2pos, unflatten } from '../utils';

export default function(instance, state) {

    /**
     * Map over all cells. It's the equivalent of Array.map just for the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {iteratorCallback} callback - The callback function that is called on each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} A new gridl instance.
     */
    function map(callback) {
        const { data, columns, rows } = state;
        const newData = data.map((v, i) => callback(v, index2pos(i, columns), instance));
        return gridl(unflatten(newData, columns, rows));
    }

    /**
     * Iterate over all cells. It's the equivalent of Array.forEach just for the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {iteratorCallback} callback - The callback function is called for each cell.<br><code>function(cell, position, gridlInstance) { return ... }</code>
     * @returns {gridl} The same gridl instance.
     */
    function forEach(callback) {
        const { data, columns } = state;
        data.forEach((v, i) => callback(v, index2pos(i, columns), instance));
        return instance;
    }

    /**
     * Applies a function against an accumulator and each element in the grid to reduce it to a single value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {reducerCallback} callback - The callback function that is executed on each cell.<br><code>function(accumulator, cell, position, gridlInstance) { return ... }</code>
     * @param {*} [initialValue=undefined] - Value to use as the first argument to the first call of the <code>callback</code>. If no initial value is supplied, the first element in the grid will be used.
     * @returns {*} The value that results from the reduction.
     */
    function reduce(callback, initialValue) {
        const { data, columns } = state;
        const reducer = (acc, v, i) => callback(acc, v, index2pos(i, columns), instance);
        return arguments.length === 1 ? data.reduce(reducer) : data.reduce(reducer, initialValue);
    }

    /**
     * Fill every cells with a value. You can either provide a value or a callback function to set the value for each cell.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {(iteratorCallback|*)} callbackOrValue - Either a fixed value for each cell or a callback function to fill each cell separately.
     * @returns {gridl} The same gridl instance.
     */
    function fill(callbackOrValue) {
        const { data, columns } = state;
        if (typeof callbackOrValue === 'function') {
            data.forEach((v, i) => data[i] = callbackOrValue(v, index2pos(i, columns), instance));
        }
        else {
            data.forEach((v, i) => data[i] = callbackOrValue);
        }
        return instance;
    }

    return {
        methods: {
            map,
            forEach,
            reduce,
            fill,
        }
    };
}
