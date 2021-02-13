import {GridTransformer} from "./types";
import {addColumn} from "./addColumn";
import {removeColumn} from "./removeColumn";
import {transform} from "./transform";
import {selectColumn} from "../core/selectors";

/**
 * Creates a transformer that moves a column from one x-position to another.
 *
 * @param fromX Defines the x-position of the column that should be moved.
 * @param toX Defines the x-position of where the column is to be moved.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 1,  2,  3],
 *     [4, 5,  6,  7],
 *     [8, 9, 10, 11],
 * ]);
 * const fromX = 2;
 * const toX = 1;
 * const newGrid = moveColumn(fromX, toX)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 4,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [0,  2, 1,  3],
 * //         [4,  6, 5,  7],
 * //         [8, 10, 9, 11],
 * //     ],
 * // }
 * ```
 */
export function moveColumn<T>(fromX: number, toX: number): GridTransformer<T> {
    return (grid) => {
        const isValidFromX = fromX >= 0 && fromX < grid.columnCount;
        const isValidToX = toX >= 0 && toX < grid.columnCount;

        if (!isValidFromX || !isValidToX || fromX === toX) {
            return grid;
        }

        const column = selectColumn({grid, x: fromX}) as T[];

        return transform<T>(
            removeColumn(fromX),
            addColumn(toX, column),
        )(grid);
    };
}
