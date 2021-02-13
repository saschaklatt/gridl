import {Position} from "../core/types";
import {GridTransformer} from "./types";
import {isOutOfShape, positionsEqual} from "../core/utils";
import {map} from "./map";
import {selectCell} from "../core/selectors";

/**
 * Creates a transformer that swaps the values of two cells.
 *
 * @param position1 Position of the first cell.
 * @param position2 Position of the second cell.
 * @template T The cell type.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 1, 2],
 *     [3, 4, 5],
 *     [6, 7, 8],
 * ]);
 * const pos1 = {x: 1, y: 0};
 * const pos2 = {x: 2, y: 2};
 * const newGrid = swapCells(pos1, pos2)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 9,
 * //     columnCount: 3,
 * //     rowCount: 3,
 * //     _array2D: [
 * //         [0, 8, 2],
 * //         [3, 4, 5],
 * //         [6, 7, 1],
 * //     ],
 * // }
 * ```
 */
export function swapCells<T>(position1: Position, position2: Position): GridTransformer<T> {
    return (grid) => {
        const pos1Outside = isOutOfShape(position1, grid);
        const pos2Outside = isOutOfShape(position2, grid);

        if (pos1Outside || pos2Outside) {
            return grid;
        }

        const cell1 = selectCell({...position1, grid}) as T;
        const cell2 = selectCell({...position2, grid}) as T;

        return map<T>((cell, pos) => {
            if (positionsEqual(pos, position1)) {
                return cell2;
            }
            if (positionsEqual(pos, position2)) {
                return cell1;
            }
            return cell;
        })(grid);
    };
}
