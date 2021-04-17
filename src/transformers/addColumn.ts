import {GridTransformer} from "./types";
import {addColumns} from "./addColumns";

/**
 * Creates a transformer that adds the given column at the given x-position.
 *
 * @param x The x-position of where to add the column.
 * @param column The column to add.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```js
 * const x = 1;
 * const y = 2;
 * const grid = createGridFromArray2D({
 *     x,
 *     y,
 *     array2D: [
 *         [1, 2, 3],
 *         [4, 5, 6],
 *     ],
 * });
 * const newCol = [8, 9];
 * const newGrid = addColumn(1, newCol)(grid);
 * // => {
 * //    x: 1,
 * //    y: 2,
 * //    cellCount: 8,
 * //    rowCount: 2,
 * //    columnCount: 4,
 * //    array2D: [
 * //        [1, 8, 2, 3],
 * //        [4, 9, 5, 6],
 * //    ],
 * // }
 * ```
 */
export function addColumn<T>(x: number, column: T[]): GridTransformer<T> {
    return addColumns(x, [column]);
}
