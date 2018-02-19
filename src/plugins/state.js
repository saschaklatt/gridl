import gridl from '../index';
import { unflatten } from '../utils';

export default function(context, stateProvider) {

    const state = stateProvider.getState();
    const { columns, rows, position } = state;

    /**
     * Get the current size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @returns {number[]}
     */
    function size() {
        return [columns, rows];
    }

    /**
     * Exports a copy of the internal data as two-dimensional array.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @returns {Array.<Array.<*>>} The data as two-dimensional array.
     */
    function data() {
        return unflatten(state.data, columns);
    }

    /**
     * Exports all entries as an one dimensional array.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @returns {Array.<*>}
     */
    function list() {
        return ([...state.data]);
    }

    /**
     * Make a clone of the current gridl instance.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @returns {gridl} A new gridl instance.
     */
    function clone() {
        return gridl(unflatten(state.data, columns)).goto(position);
    }

    return {
        size,
        data,
        list,
        clone,
    };
}
