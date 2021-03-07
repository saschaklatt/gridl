import {GridTransformer} from "./types";
import {addRow} from "./addRow";

/**
 * Creates a transformer that adds the given row to the bottom of the grid.
 *
 * @param row The row to add.
 * @template T The cell type.
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * const newRow = [7, 8, 9];
 * const newGrid = addRowBottom(newRow)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [1, 2, 3],
 * //         [4, 5, 6],
 * //         [7, 8, 9],
 * //     ],
 * // }
 * ```
 */
export function addRowBottom<T>(row: T[]): GridTransformer<T> {
    return (grid) => addRow<T>(grid.rowCount, row)(grid);
}
