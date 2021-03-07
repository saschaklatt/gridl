import {createGridFromArray2D} from "../core/grid";
import {createWalker} from "../core/walker";
import {addPositions, cloneArray2D, isOutOfShape} from "../core/utils";
import {Grid} from "../core/types";
import {GridTransformer} from "./types";
import {selectCell} from "../core/selectors";

/**
 * Creates a transformer that applies the values of a subgrid on the main grid.
 *
 * @param subGridPosition The position of the upper left corner of the subgrid on the main grid.
 * @param subGrid The subgrid that contains the values to be applied to the main grid.
 * @template T The cell type.
 * @example ```js
 * // create base grid
 * const grid = createGridFromArray2D([
 *     [ 0,  1,  2,  3,  4,  5],
 *     [ 6,  7,  8,  9, 10, 11],
 *     [12, 13, 14, 15, 16, 17],
 *     [18, 19, 20, 21, 22, 23],
 *     [24, 25, 26, 27, 28, 29],
 * ]);
 *
 * // create subgrid at position {x: 1, y: 2}
 * const subGrid = createGridFromArray2D({
 *     x: 1,
 *     y: 2,
 *     array2D: [
 *         [6, 6, 6],
 *         [6, 6, 6],
 *         [6, 6, 6],
 *     ],
 * });
 *
 * // apply subgrid
 * const newGrid = setSubGrid(subGrid)(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 30,
 * //     columnCount: 6,
 * //     rowCount: 5,
 * //     array2D: [
 * //         [ 0,  1,  2,  3,  4,  5],
 * //         [ 6,  7,  8,  9, 10, 11],
 * //         [12,  6,  6,  6, 16, 17],
 * //         [18,  6,  6,  6, 22, 23],
 * //         [24,  6,  6,  6, 28, 29],
 * //     ],
 * // }
 * ```
 */
export function setSubGrid<T>(subGrid: Grid<T>): GridTransformer<T> {
    return (grid) => {
        const walker = createWalker(subGrid);
        const array2D = cloneArray2D(grid.array2D);

        let iteration = walker.next();

        while(!iteration.done) {
            const pos = addPositions(subGrid, iteration.value.position);

            if (!isOutOfShape(pos, grid)) {
                array2D[pos.y][pos.x] = selectCell({...iteration.value.position, grid: subGrid}) as T;
            }

            iteration = walker.next();
        }

        return createGridFromArray2D({...grid, array2D});
    };
}
