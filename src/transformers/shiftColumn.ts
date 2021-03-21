import {selectColumn} from "../core";
import {setColumn} from "./setColumn";
import {GridTransformer} from "./types";

interface ShiftColumnProps {
    x: number,
    steps: number,
}

const _getShiftedIdxPositive = (y: number, steps: number, rowCount: number) => {
    return (y + steps) % rowCount;
};

const _getShiftedIdxNegative = (y: number, steps: number, rowCount: number) => {
    return (rowCount + steps + y) % rowCount;
};

/**
 * Shifts a column by the given amount of steps in a positive (downwards) or negative (upwards) direction.
 *
 * @param props The x-value that indicates the column to shift and the steps which indicate the number of steps to shift.
 * @template T The cell type.
 * @since 0.11.6
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * const newGrid = shiftColumn({x: 0, steps: 1})(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [7, 2, 3],
 * //         [1, 5, 6],
 * //         [4, 8, 9],
 * //     ],
 * // }
 * ```
 */
export function shiftColumn<T>(props: ShiftColumnProps): GridTransformer<T> {
    return (grid) => {
        const col = selectColumn({grid, x: props.x});
        if (!col || props.steps === 0) {
            return grid;
        }

        const {rowCount} = grid;
        const steps = props.steps % rowCount;
        const newCol = new Array(rowCount);
        const getShiftedIdx = steps >= 0 ? _getShiftedIdxPositive : _getShiftedIdxNegative;

        for (let x = 0; x < rowCount; x++) {
            const newX = getShiftedIdx(x, steps, rowCount);
            newCol[newX] = col[x];
        }

        return setColumn(props.x, newCol)(grid);
    };
}
