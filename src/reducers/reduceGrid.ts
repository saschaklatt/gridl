import {selectCell} from "../core/selectors";
import {Grid, GridWalker, Position} from "../core/types";
import {createWalker} from "../core/walker";

/**
 * Callback function that is called from the {@link reduceGrid} function on each cell. It returns the result
 * of the current iteration.
 *
 * @template T The cell type.
 * @template U The result type.
 */
export interface ReduceCallback<T, U> {
    /**
     * @param acc The accumulator accumulates callback's return values. It is the accumulated value previously returned in the last invocation of the callback—or initialValue, if it was supplied.
     * @param cellValue The current cell being processed in the grid.
     * @param index The index of the current cell being processed in the grid, starting from 0.
     * @param srcGrid The grid {@link reduceGrid} was called upon.
     */
    (acc: U, cellValue: T, position: Position, index: number, srcGrid: Grid<T>): U
}

/**
 * Creates a reducer function that executes the provided callback function on each cell of the grid, resulting in a single output value.
 *
 * @param grid The grid to be reduced.
 * @param callback The callback function that is executed on each cell in the grid.
 * @param initialValue The value to use as the first argument to the first call of the callback.
 * @param walk This function calculates the grid position based on the iteration step and therefore defines the order in which the cells are iterated. If no walker is defined {@link walkDefault} is used.
 * @template T The cell type.
 * @template U The result type.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 * const initialValue = 10;
 * const sum = reduceGrid(grid, (acc, cellValue: number) => acc + cellValue, initialValue);
 * // => 31 (10 + 1 + 2 + 3 + 4 + 5 + 6)
 * ```
 */
export function reduceGrid<T, U>(grid: Grid<T>, callback: ReduceCallback<T, U>, initialValue: U, walk?: GridWalker): U {
    const walker = createWalker(grid, walk);

    let acc: U = initialValue;
    let iteration = walker.next();

    while (!iteration.done) {
        const {index, position} = iteration.value;
        const cell = selectCell({...position, grid}) as T;
        acc = callback(acc, cell, position, index, grid);
        iteration = walker.next();
    }

    return acc;
}
