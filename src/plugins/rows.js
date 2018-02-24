import gridl from '../index';
import { flatten, unflatten } from '../utils';

const getRow = (data, y) => data[y];

export default function(context, state) {

    /**
     * Get the number of rows.
     *
     * @memberOf gridl
     * @method
     * @instance
     * @returns {number}
     */
    function numRows() {
        return state.rows;
    }

    /**
     * Get the row at a certain y-position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} y - The y-position of the row you want to get.
     * @returns {Array.<*>}
     */
    function row(y) {
        const { data, columns} = state;
        return getRow(unflatten(data, columns), y);
    }

    /**
     * Add a row at a certain y-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<*>} row - The row you want to add as an one-dimensional array.
     * @param {number} y - The y-position of where you want to add the row.
     * @returns {gridl} The same gridl instance.
     */
    function addRow(row, y) {
        const { data, rows, columns} = state;
        if (y < 0 || y > rows) {
            throw new Error(`Trying to add row at an invalid position. Given: ${y}`);
        }
        if (row.length !== columns) {
            throw new Error(`Trying to add a row that contains an invalid amount of cells. Expected: ${columns}, Given: ${row.length}`);
        }
        const grid = unflatten(data, columns);
        grid.splice(y, 0, row);
        state.data = flatten(grid);
        state.rows = grid.length;
        return context;
    }

    /**
     * Remove a row at a certain y-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} y - The y-position of the row you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    function removeRow(y) {
        const { data, rows, columns} = state;
        if (y < 0 || y >= rows) {
            throw new Error(`Trying to remove a row at an invalid position. Given: ${y}`);
        }
        if (rows <= 1) {
            throw new Error('Cannot remove row because the grid would be empty after it.');
        }
        const grid = unflatten(data, columns);
        grid.splice(y, 1);
        state.data = flatten(grid);
        state.rows = grid.length;
        return context;
    }

    return {
        methods: {
            addRow,
            numRows,
            removeRow,
            row,
        },
    };
}
