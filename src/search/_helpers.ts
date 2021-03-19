import {Grid} from "../core/types";
import {createWalker, walkDefault} from "../core/walker";
import {selectCell} from "../core/selectors";

interface CompeteCallback<T> {
    (cell: T, prevWinner: T): boolean
}

/**
 * Returns the cell that wins against all other cell in the given compete function.
 */
export const _findWinner = <T>(grid: Grid<T>, compete: CompeteCallback<T>): T | undefined => {
    const walker = createWalker(grid, walkDefault);

    let prevIteration = walker.next();
    if (prevIteration.done) {
        return undefined;
    }

    let winner = selectCell({...prevIteration.value.position, grid}) as T;
    let iteration = walker.next();

    while (!iteration.done) {
        const value = selectCell({...iteration.value.position, grid}) as T;
        if (compete(value, winner)) {
            winner = value;
        }
        prevIteration = iteration;
        iteration = walker.next();
    }

    return winner;
};
