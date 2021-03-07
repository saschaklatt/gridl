import {createGridFromArray2D} from "../core/grid";
import {selectRow} from "../core/selectors";
import {GridTransformer} from "./types";

/**
 * Creates a transformer that swaps two rows at the given y-positions.
 * If one or both y-positions are outside of the grid, the original grid is returned without any transformations.
 *
 * @param y1 The y-position of the first row.
 * @param y2 The y-position of the second row.
 * @template T The cell type.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 1, 2],
 *     [3, 4, 5],
 *     [6, 7, 8],
 * ]);
 * const newGrid = swapRows(0, 1)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [3, 4, 5],
 * //         [0, 1, 2],
 * //         [6, 7, 8],
 * //     ],
 * // }
 * ```
 */
export function swapRows<T>(y1: number, y2: number): GridTransformer<T> {
    return (grid) => {
        const y1Outside = y1 < 0 || y1 >= grid.rowCount;
        const y2Outside = y2 < 0 || y2 >= grid.rowCount;

        if (y1Outside || y2Outside) {
            return grid;
        }

        const row1 = selectRow({grid, y: y1}) as T[];
        const row2 = selectRow({grid, y: y2}) as T[];

        const array2D = grid.array2D.map((row, y) => {
            if (y === y1) {
                return row2;
            }
            if (y === y2) {
                return row1;
            }
            return row;
        });
        return createGridFromArray2D({...grid, array2D});
    };
}
