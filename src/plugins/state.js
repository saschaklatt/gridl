import gridl from '../index';
import { unflatten } from '../utils';

export default function(context, stateProvider) {

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
        const { columns, rows } = stateProvider.getState();
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
        const { data, columns } = stateProvider.getState();
        return unflatten(data, columns);
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
        return ([...stateProvider.getState().data]);
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
        const { data, columns, position } = stateProvider.getState();
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
