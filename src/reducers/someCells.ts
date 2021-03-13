import {createWalker, selectCell} from "../core";
import {Grid, Position} from "../core/types";

export interface SomeCellsPredicate<T> {
    /**
     * @param cellValue The current cell being processed in the grid.
     * @param position The position of the current cell being processed in the grid, starting from 0.
     * @param index The index of the current cell being processed in the grid, starting from 0.
     * @param srcGrid The grid `someCells` was called upon.
     */
     (cellValue: T, position: Position, index: number, srcGrid: Grid<T>): boolean
}

/**
 * True if `predicate` returns true for at least one cells in the grid.
 *
 * @param grid The grid to be checked.
 * @param predicate The callback function to be matched.
 * @template T The cell type.
 * @since 0.11.3
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 2, 3],
 *     [4, 5, 6],
 * ]);
 *
 * const allLessThan10 = (cell: number) => cell < 10;
 * someCells(grid, allLessThan10); // => true
 *
 * const someEqual5 = (cell: number) => cell === 5;
 * someCells(grid, someEqual5); // => false
 * ```
 */
export function someCells<T>(grid: Grid<T>, predicate: SomeCellsPredicate<T>): boolean {
    const walker = createWalker(grid);
    let step = walker.next();

    while (!step.done) {
        const {index, position} = step.value;
        const cell = selectCell({...position, grid}) as T;
        const res = predicate(cell, position, index, grid);
        if (res) {
            return true;
        }
        step = walker.next();
    }

    return false;
}
