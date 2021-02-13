import {GridTransformer} from "./types";
import {isOutOfShape} from "../core/utils";
import {createGrid} from "../core/grid";
import {Position} from "../core";
import {selectCell} from "../core/selectors";

/**
 * Creates a transformer that sets the cell value at the given x- and y-coordinates.
 *
 * @param position The position of the cell to update.
 * @param value The value to set.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 1, 2, 3],
 *     [4, 5, 6, 7],
 *     [8, 9, 10, 11],
 * ]);
 * const newGrid = setCell({x: 2, y: 1}, "moin")(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 4,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [0, 1, 2, 3],
 * //         [4, 5, "moin", 7],
 * //         [8, 9, 10, 11],
 * //     ],
 * // }
 * ```
 */
export const setCell = <T>(position: Position, value: T): GridTransformer<T> => {
    const {x, y} = position;
    return (grid) => {
        if (isOutOfShape(position, grid)) {
            return grid;
        }
        return createGrid({
            ...grid,
            createCell(pos) {
                return (pos.x === x && pos.y === y)
                    ? value
                    : selectCell({...pos, grid}) as T;
            },
        });
    };
};
