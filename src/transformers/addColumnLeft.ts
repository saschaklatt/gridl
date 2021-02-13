import {addColumn} from "./addColumn";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that adds the given column at the left side of a grid.
 *
 * @param column The column to add.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * const newCol = [8, 9];
 * const newGrid = addColumnLeft(newCol)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 8,
 * //     columnCount: 4,
 * //     rowCount: 2,
 * //     _array2D: [
 * //         [8, 1, 2, 3],
 * //         [9, 4, 5, 6],
 * //     ],
 * // }
 * ```
 */
export function addColumnLeft<T>(column: T[]): GridTransformer<T> {
    return (grid) => addColumn<T>(0, column)(grid);
}
