import gridl from '../index';
import { flatten, unflatten, validateGridArray } from '../utils';

export default function(context, state) {

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
        const { columns, rows } = state;
        return [columns, rows];
    }

    /**
     * Exports a copy of the internal data as two-dimensional array or imports a new data into the array. If you use it to import new grid data, make sure the new data has the same size.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<Array.<*>>} [newData] The new data you want to import as a two-dimensional grid array.
     * @returns {Array.<Array.<*>>} The data as two-dimensional array or the same gridl instance if you use it as a setter.
     */
    function data(newData) {
        if (arguments.length) {
            validateGridArray(newData);
            state.data = flatten(newData);
            return context;
        }
        return unflatten(state.data, state.columns);
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
        const { data, columns, position } = state;
        return gridl(unflatten(data, columns)).goto(position);
    }

    return {
        methods: {
            size,
            data,
            list,
            clone,
        },
    };
}
