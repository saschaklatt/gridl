import { flatten, isNotInArea, pos2index, unflatten } from '../utils';

const _swap = (arr, i1, i2) => {
    const tmp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = tmp;
    return arr;
};

const _swapCells = (data, columns, rows, position1, position2) => {
    const size = [columns, rows];
    if (isNotInArea(size, position1) || isNotInArea(size, position2)) {
        throw new Error('Trying to swap cells with an invalid position.');
    }
    const index1 = pos2index(position1, columns);
    const index2 = pos2index(position2, columns);
    return _swap(data, index1, index2);
};

export default function(context, stateProvider) {


    /**
     * Swaps the values of the cell at the current position and another cell.<br>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} otherPosition - The position of the first cell.
     * @returns {gridl} The same gridl instance.
     */
    function swapCell(otherPosition) {
        const { data, columns, rows, position } = stateProvider.getState();
        _swapCells(data, columns, rows, position, otherPosition);
        return context;
    }

    /**
     * Swaps the values of two cells.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} position1 - The position of the first cell.
     * @param {Array.<number>} position2 - The position of the second cell.
     * @returns {gridl} The same gridl instance.
     */
    function swapCells(position1, position2) {
        const { data, columns, rows } = stateProvider.getState();
        _swapCells(data, columns, rows, position1, position2);
        return context;
    }

    /**
     * Swaps the values of two columns.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} x1 - The x-position of the first column.
     * @param {Array.<number>} x2 - The x-position of the second column.
     * @returns {gridl} The same gridl instance.
     */
    function swapColumns(x1, x2) {
        const { data, columns } = stateProvider.getState();
        if (x1 < 0 || x1 >= columns) {
            throw new Error(`Trying to swap columns from an invalid position. Given: ${x1}`);
        }
        if (x2 < 0 || x2 >= columns) {
            throw new Error(`Trying to swap columns to an invalid position. Given: ${x2}`);
        }
        const grid = unflatten(data, columns).map(row => {
            _swap(row, x1, x2);
            return row;
        });
        stateProvider.setState({
            data: flatten(grid),
        });
        return context;
    }

    /**
     * Swaps the values of two rows.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} y1 - The y-position of the first row.
     * @param {Array.<number>} y2 - The y-position of the second row.
     * @returns {gridl} The same gridl instance.
     */
    function swapRows(y1, y2) {
        const { data, columns, rows } = stateProvider.getState();
        if (y1 < 0 || y1 >= rows) {
            throw new Error(`Trying to swap rows from an invalid position. Given: ${y1}`);
        }
        if (y2 < 0 || y2 >= rows) {
            throw new Error(`Trying to swap rows to an invalid position. Given: ${y2}`);
        }
        stateProvider.setState({
            data: flatten(_swap(unflatten(data, columns), y1, y2)),
        });
        return context;
    }

    return {
        methods: {
            swapCell,
            swapCells,
            swapColumns,
            swapRows,
        },
    };
}
