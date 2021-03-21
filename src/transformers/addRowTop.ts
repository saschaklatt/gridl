import {GridTransformer} from "./types";
import {addRow} from "./addRow";

/**
 * Creates a transformer that adds the given row to the top of the grid.
 *
 * @param row The row to add.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * const newRow = [7, 8, 9];
 * const newGrid = addRowTop(newRow)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [7, 8, 9],
 * //         [1, 2, 3],
 * //         [4, 5, 6],
 * //     ],
 * // }
 * ```
 */
export function addRowTop<T>(row: T[]): GridTransformer<T> {
    return addRow<T>(0, row);
}
