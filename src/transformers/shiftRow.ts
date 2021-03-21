import {selectRow} from "../core";
import {setRow} from "./setRow";
import {GridTransformer} from "./types";

interface ShiftRowProps {
    y: number,
    steps: number,
}

const _getShiftedIdxPositive = (x: number, steps: number, columnCount: number) => {
    return (x + steps) % columnCount;
};

const _getShiftedIdxNegative = (x: number, steps: number, columnCount: number) => {
    return (columnCount + steps + x) % columnCount;
};

/**
 * Shifts a row by the given amount of steps in a positive (right) or negative (left) direction.
 *
 * @param props The y-value that indicates the row to shift and the steps which indicate the number of steps to shift.
 * @template T The cell type.
 * @since 0.11.6
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * const newGrid = shiftRow({y: 0, steps: 1})(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [3, 1, 2],
 * //         [4, 5, 6],
 * //         [7, 8, 9],
 * //     ],
 * // }
 * ```
 */
export function shiftRow<T>(props: ShiftRowProps): GridTransformer<T> {
    return (grid) => {
        const row = selectRow({grid, y: props.y});
        if (!row || props.steps === 0) {
            return grid;
        }

        const {columnCount} = grid;
        const steps = props.steps % columnCount;
        const newRow = new Array(columnCount);
        const getShiftedIdx = steps >= 0 ? _getShiftedIdxPositive : _getShiftedIdxNegative;

        for (let x = 0; x < columnCount; x++) {
            const newX = getShiftedIdx(x, steps, columnCount);
            newRow[newX] = row[x];
        }

        return setRow(props.y, newRow)(grid);
    };
}
