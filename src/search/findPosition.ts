import {createWalker} from "../core/walker";
import {isFunction} from "../core/utils";
import {Position, Grid, GridWalker} from "../core/types";
import {FindCallback} from "./types";
import {selectCell} from "../core/selectors";

const createCallbackWrapper = <T>(searchValue: T) => (value: T) => value === searchValue;

/**
 * Receives a grid and returns the value of the first element that satisfies the provided
 * testing function. If no values satisfies the testing function, `undefined` is returned.
 *
 * @param grid The grid in which to search.
 * @param valueOrCallback Cell value to find or callback function that is called on each cell. Should return true if the element is found or false if not.
 * @param walk This function calculates the grid position based on the iteration index and therefore defines the order in which the cells are iterated. If no walker is defined {@link walkDefault} is used.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [1, 1, 1, 4],
 *     [5, 6, "test", 8],
 *     [1, "test", 3, 4],
 * ]);
 * findPosition((v) => v > 2, grid); // => {x: 3, y: 0}
 * findPosition((v) => typeof v === "string", grid); // => {x: 2, y: 1}
 * ```
 */
export const findPosition = <T>(grid: Grid<T>, valueOrCallback: FindCallback<T> | T, walk?: GridWalker): Position | undefined => {
    const callback = isFunction(valueOrCallback)
        ? valueOrCallback as FindCallback<T>
        : createCallbackWrapper(valueOrCallback);

    const walker = createWalker(grid, walk);
    let iteration = walker.next();

    while (!iteration.done) {
        const {position, index} = iteration.value;
        const value = selectCell({...position, grid});
        const foundPosition = value && callback(value, position, index, grid);

        if (foundPosition) {
            return position;
        }

        iteration = walker.next();
    }

    return undefined;
};
