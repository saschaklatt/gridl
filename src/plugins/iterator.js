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

export default function(context, stateProvider) {

    const { data, columns, rows, position } = stateProvider.getState();

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
        const newData = data.map((v, i) => callback(v, index2pos(i, columns), context));
        return gridl(unflatten(newData, columns));
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
        data.forEach((v, i) => callback(v, index2pos(i, columns), context));
        return context;
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
        const reducer = (acc, v, i) => callback(acc, v, index2pos(i, columns), context);
        return arguments.length === 1 ? data.reduce(reducer) : data.reduce(reducer, initialValue);
    }

    return {
        map,
        forEach,
        reduce,
    };
}
