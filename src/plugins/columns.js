import gridl from '../index';
import { flatten, unflatten, getColumn } from '../utils';
import utils from '../utils';

export default function(context, stateProvider) {

    const { data, columns, rows } = stateProvider.getState();

    /**
     * Get the number of columns.
     *
     * @memberOf gridl
     * @method
     * @instance
     * @returns {number}
     */
    function numColumns() {
        return columns;
    }

    /**
     * Get the column at a certain x-position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} x - The x-position of the column you want to get.
     * @returns {Array.<*>}
     */
    function column(x) {
        return getColumn(unflatten(data, columns), x);
    }

    /**
     * Add a column at a certain x-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<*>} column - The column you want to add as an one-dimensional array.
     * @param {number} x - The x-position of where you want to add the column.
     * @returns {gridl} The same gridl instance.
     */
    function addColumn(column, x) {
        if (x < 0 || x > columns) {
            throw new Error(`Trying to add column at an invalid position. Given: ${x}`);
        }
        if (column.length !== rows) {
            throw new Error(`Trying to add a column that contains an invalid amount of cells. Expected: ${rows}, Given: ${column.length}`);
        }
        const grid = utils.unflatten(data, columns).map((row, i) => {
            row.splice(x, 0, column[i]);
            return row;
        });

        stateProvider.setState({
            data: utils.flatten(grid),
            columns: grid[0].length,
        });
        return context;
    }

    /**
     * Remove a column at a certain x-position. This changes the size of the grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} x - The x-position of the column you want to remove.
     * @returns {gridl} The same gridl instance.
     */
    function removeColumn(x) {
        if (x < 0 || x >= columns) {
            throw new Error(`Trying to remove a column at an invalid position. Given: ${x}`);
        }
        if (columns <= 1) {
            throw new Error('Cannot remove column because the grid would be empty after it.');
        }
        const grid = unflatten(data, columns).map(row => row.filter((v, c) => c !== x));
        stateProvider.setState({
            data: flatten(grid),
            columns: grid[0].length,
        });
        return context;
    }

    return {
        addColumn,
        column,
        numColumns,
        removeColumn,
    };
}
