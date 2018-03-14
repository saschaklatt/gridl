import {
    addPositions,
    flatten,
    isNotInArea,
    pos2index,
    unflatten,
} from '../utils';

const _move = (data, fromIndex, toIndex) => {
    const cell = data[fromIndex];
    data.splice(fromIndex, 1);
    data.splice(toIndex, 0, cell);
    return data;
};

const _moveCell = (data, columns, rows, from, to) => {
    const fromIndex = pos2index(from, columns);
    const size = [columns, rows];
    if (isNaN(fromIndex) || isNotInArea(size, from)) {
        throw new Error(`Trying to move cell from an invalid position. Given: [${from}]`);
    }
    const toIndex = pos2index(to, columns);
    if (isNaN(toIndex) || isNotInArea(size, to)) {
        throw new Error(`Trying to move cell to an invalid position. Given: [${to}]`);
    }
    return _move(data, fromIndex, toIndex);
};

export default function(context, state) {

    /**
     * Move a cell from one position to another.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} from - The position of the cell that you want to move.
     * @param {Array} to - The position where the cell should be moved.
     * @returns {gridl} - The current gridl instance.
     */
    function moveCell(from, to) {
        const { data, columns, rows } = state;
        state.data = _moveCell(data, columns, rows, from, to);
        return context;
    }

    /**
     * Move a column to a certain position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} xFrom - The position on the x-axis of the column you want to move.
     * @param {number} xTo - The position on the x-axis of where the column should be moved.
     * @returns {gridl}
     */
    function moveColumn(xFrom, xTo) {
        const { data, columns, rows } = state;
        if (xFrom < 0 || xFrom >= columns) {
            throw new Error(`Trying to move column from an invalid position. Given: ${xFrom}`);
        }
        if (xTo < 0 || xTo >= columns) {
            throw new Error(`Trying to move column to an invalid position. Given: ${xTo}`);
        }
        state.data = flatten(unflatten(data, columns, rows).map(row => _move(row, xFrom, xTo)));
        return context;
    }

    /**
     * Move a row to a certain position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} yFrom - The position on the y-axis of the row you want to move.
     * @param {number} yTo - The position on the y-axis of where the row should be moved to.
     * @returns {gridl} The current gridl instance.
     */
    function moveRow(yFrom, yTo) {
        const { data, columns, rows } = state;
        if (yFrom < 0 || yFrom >= rows) {
            throw new Error(`Trying to move row from an invalid position. Given: ${yFrom}`);
        }
        if (yTo < 0 || yTo >= rows) {
            throw new Error(`Trying to move row to an invalid position. Given: ${yTo}`);
        }
        state.data = flatten(_move(unflatten(data, columns, rows), yFrom, yTo));
        return context;
    }

    return {
        methods: {
            moveCell,
            moveColumn,
            moveRow,
        },
    };
}
