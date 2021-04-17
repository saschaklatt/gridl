import {addRows} from "./addRows";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that adds the given row at the given y-position.
 *
 * @param y The y-position of where to add the row.
 * @param row The row to add.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * const newRow = [7, 8, 9];
 * const newGrid = addRow(1, newRow)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [1, 2, 3],
 * //         [7, 8, 9],
 * //         [4, 5, 6],
 * //     ],
 * // }
 * ```
 */
export function addRow<T>(y: number, row: T[]): GridTransformer<T> {
    return addRows(y, [row]);
}
