import {createGridFromArray2D} from "../core/grid";
import {createWalker} from "../core/walker";
import {createArray2D} from "../core/utils";
import {Grid, GridWalker, Position} from "../core/types";
import {GridTransformer} from "./types";
import {selectCell} from "../core/selectors";

/**
 * Callback function that is called on each cell and returns the new value for this cell.
 * @template T The cell type of the original grid.
 * @template U The cell type of the new grid.
 */
export interface MapCallback<T, U = T> {
    /**
     * @param cellValue The value of the current cell.
     * @param position The position of the current cell.
     * @param index The index of the current cell.
     * @param src The grid that is mapped.
     * @returns The new cell value.
     */
    (cellValue: T, position: Position, index: number, src: Grid<T>): U
}

/**
 * Creates a transformer that iterates over each cell of the grid and replaces the cell
 * with the value returned by the callback function.
 *
 * @param callback The callback function that is called for each cell.
 * @param walk This function calculates the grid position based on the iteration step and therefore defines the order in which the cells are iterated. If no walker is defined walkDefault is used.
 * @template T The type of the original cell values.
 * @template U The type of the new cell values.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [0, 1,  2,  3],
 *     [4, 5,  6,  7],
 *     [8, 9, 10, 11],
 * ]);
 * const increaseByOne = (value) => value + 1;
 * const increaseAllByOne = map(increaseByOne);
 * const mappedGrid = increaseAllByOne(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 12,
 * //     columnCount: 4,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [1,  2,  3,  4],
 * //         [5,  6,  7,  8],
 * //         [9, 10, 11, 12],
 * //     ],
 * // }
 * ```
 */
export function map<T, U = T>(callback:MapCallback<T, U>, walk?: GridWalker): GridTransformer<T, U> {
    return (grid) => {
        const array2D = createArray2D<U | null>(grid.columnCount, grid.rowCount, () => null);
        const walker = createWalker(grid, walk);

        let iteration = walker.next();

        for (let idx = 0; !iteration.done; idx++) {
            const position = iteration.value.position;
            const oldValue = selectCell({...position, grid}) as T;
            const newValue = callback(oldValue, position, idx, grid);
            const {x, y} = position;
            array2D[y][x] = newValue;

            iteration = walker.next();
        }

        return createGridFromArray2D({...grid, array2D: array2D as U[][]});
    };
}
