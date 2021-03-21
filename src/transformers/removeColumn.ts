import {createGridFromArray2D} from "../core/grid";
import {GridTransformer} from "./types";

/**
 * Creates a transformer removes the column at the given x-position.
 *
 * @param x The x-position of the column to be removed. Invalid positions are ignored.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 *     [7, 8, 9],
 * ]);
 * const newGrid = removeColumn(1)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 6,
 * //     columnCount: 2,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [1, 3],
 * //         [4, 6],
 * //         [7, 9],
 * //     ],
 * // }
 * ```
 */
export function removeColumn<T>(x: number): GridTransformer<T> {
    return (grid) => createGridFromArray2D({
        ...grid,
        array2D: grid.array2D.map((row) => (
            row.filter((_row: any, idx: number) => idx !== x)
        )),
    });
}
