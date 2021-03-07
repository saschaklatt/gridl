import {GridTransformer} from "./types";
import {addRow} from "./addRow";
import {removeRow} from "./removeRow";
import {transform} from "./transform";
import {selectRow} from "../core/selectors";

/**
 * Creates a transformer that moves a row from one y-position to another.
 *
 * @param fromY Defines the y-position of the row that should be moved.
 * @param toY Defines the y-position of where the row is to be moved.
 * @template T The cell type.
 * @example ```js
 * createGridFromArray2D([
 *     [ 1,  2,  3],
 *     [ 4,  5,  6],
 *     [ 7,  8,  9],
 *     [10, 11, 12],
 * ]);
 * const newGrid = moveRow(0, 3)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 3,
 * //     rowCount: 4,
 * //     array2D: [
 * //         [ 4,  5,  6],
 * //         [ 7,  8,  9],
 * //         [10, 11, 12],
 * //         [ 1,  2,  3],
 * //     ],
 * // }
 * ```
 */
export function moveRow<T>(fromY: number, toY: number): GridTransformer<T> {
    return (grid) => {
        const isValidFromY = fromY >= 0 && fromY < grid.rowCount;
        const isValidToY = toY >= 0 && toY < grid.rowCount;

        if (!isValidFromY || !isValidToY || fromY === toY) {
            return grid;
        }

        const row = selectRow({grid, y: fromY}) as T[];

        return transform<T>(
            removeRow(fromY),
            addRow(toY, row),
        )(grid);
    };
}
