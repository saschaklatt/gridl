import {GridWalker, Grid, Position} from "../core/types";
import {createWalker} from "../core/walker";
import {selectCell} from "../core/selectors";

/**
 * Callback function of forEachCell that is called on each cell.
 *
 * @template T The cell type.
 */
export interface ForEachCellCallback<T> {
    /**
     * @param cell The cell value of the current iteration step.
     * @param position The position of the current iteration step.
     * @param index The index of the current iteration step, starting at 0.
     * @param src The grid that's being traversed.
     */
    (cell: T, position: Position, index: number, src: Grid<T>): boolean | void;
}

/**
 * Calls the given callback function on each cell in the grid.
 *
 * @param grid The grid in which to search.
 * @param callback The callback function that is called on each cell.
 * @param walk This function calculates the grid position based on the iteration step and therefore defines the order in which the cells are iterated.
 * @template T The cell type.
 *
 * @example ```js
 * import {createGridFromArray2D} from "gridl/core";
 * import {forEachCell} from "gridl/sideEffects";
 *
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * let str = "";
 * forEachCell(grid, (cellValue) => {
 *     str = `${str}${cellValue}`;
 * });
 * // => str === "123456"
 * ```
 */
export function forEachCell<T>(grid: Grid<T>, callback: ForEachCellCallback<T>, walk?: GridWalker): void {
    const walker = createWalker(grid, walk);

    let iteration = walker.next();

    while (!iteration.done) {
        const {position, index} = iteration.value;
        const value = selectCell({...position, grid}) as T;
        callback(value, position, index, grid);
        iteration = walker.next();
    }
}
