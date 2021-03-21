import {addColumn} from "./addColumn";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that adds the given column at the right side of a grid.
 *
 * @param column The column to add.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * const newColumn = [8, 9];
 * const newGrid = addColumnRight(newColumn)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 8,
 * //     columnCount: 4,
 * //     rowCount: 2,
 * //     array2D: [
 * //         [1, 2, 3, 8],
 * //         [4, 5, 6, 9],
 * //     ],
 * // }
 * ```
 */
export function addColumnRight<T>(column: T[]): GridTransformer<T> {
    return (grid) => addColumn<T>(grid.columnCount, column)(grid);
}
