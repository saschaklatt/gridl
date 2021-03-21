import {createGridFromArray2D} from "../core/grid";
import {isOutOfRange} from "../core/utils";
import {GridTransformer} from "./types";

/**
 * Replaces the row at the given y-positon with the provided row.
 *
 * @param y The y-position of the row to be replaced.
 * @param newRow The new row to replace to old one.
 * @param xOffset An optional offset to shift the new row on the x-axis.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```ts
 * const grid = createGridFromArray2D([
 *     [0, 0, 0],
 *     [0, 0, 0],
 *     [0, 0, 0],
 * ]);
 * const newRow = [6, 6, 6];
 * const newGrid = setRow(0, newRow)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [6, 6, 6],
 * //         [0, 0, 0],
 * //         [0, 0, 0],
 * //     ],
 * // }
 * ```
 */
export function setRow<T>(y: number, newRow: T[], xOffset = 0): GridTransformer<T> {
    return (grid) => {
        if (isOutOfRange(y, grid.rowCount)) {
            return grid;
        }

        const array2D = grid.array2D.map((oldRow, idx) => {
            if (idx !== y) {
                return oldRow;
            }

            // simply replace old row with new row
            if (xOffset === 0 && newRow.length === grid.columnCount) {
                return newRow;
            }

            // replace cells separately
            const resultingRow: T[] = [];
            for (let x = 0; x < oldRow.length; x++) {
                if (x < xOffset) {
                    resultingRow.push(oldRow[x]);
                }
                else if (x - xOffset < newRow.length) {
                    resultingRow.push(newRow[x - xOffset]);
                }
                else {
                    resultingRow.push(oldRow[x]);
                }
            }
            return resultingRow;
        });
        return createGridFromArray2D({...grid, array2D});
    };
}
