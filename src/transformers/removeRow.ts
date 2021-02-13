import {GridTransformer} from "./types";
import {isOutOfRange} from "../core/utils";
import {createGridFromArray2D} from "../core/grid";

/**
 * Creates a transformer removes the row at the given y-position.
 *
 * @param y The y-position of the column to be removed. Invalid positions are ignored.
 * @template T The cell value.
 * @example ```js
 * const grid = createGrid({
 *     createCell: (_pos, idx) => idx + 1
 *     columnCount: 3,
 *     rowCount: 3,
 *     x; 1,
 *     y: 2,
 * });
 * const newGrid = removeRow(1)(grid);
 * // => {
 * //     x: 1,
 * //     y: 2,
 * //     cellCount: 6,
 * //     columnCount: 3,
 * //     rowCount: 2,
 * //     _array2D: [
 * //         [1, 2, 3],
 * //         [7, 8, 9],
 * //     ],
 * // });
 * ```
 */
export const removeRow = <T>(y: number): GridTransformer<T> => {
    return (grid) => {
        if (isOutOfRange(y, grid.rowCount)) {
            return grid;
        }
        return createGridFromArray2D({...grid, array2D: grid._array2D.filter((_row, idx) => idx !== y)});
    };
};
