import {Area, Grid} from "../core/types";
import {GridTransformer} from "./types";
import {coordinatesToArea, isNumber} from "../core/utils";
import {selectSubGrid} from "../core/selectors";

/**
 * Creates a transformer that crops a grid to the given area.
 * Positions that are outside of the grid are ignored.
 *
 * @param area The area which defines the subgrid to be extracted.
 * @template T The cell type.
 * @since 0.11.1
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [ 0,  1,  2,  3],
 *     [ 4,  5,  6,  7],
 *     [ 8,  9, 10, 11],
 *     [12, 13, 14, 15],
 *     [16, 17, 18, 19],
 *     [20, 21, 22, 23],
 *     [24, 25, 26, 27],
 * ]);
 * const area = {x: 1, y: 2, columnCount: 2, rowCount: 3};
 * const croppedGrid = crop(area)(grid);
 * // => {
 * //     x: 1,
 * //     y: 2,
 * //     cellCount: 6,
 * //     columnCount: 2,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [ 9, 10],
 * //         [13, 14],
 * //         [17, 18],
 * //     ],
 * // }
 * ```
 */
export function crop<T>(area: Area): GridTransformer<T>;

/**
 * Creates a transformer that crops a grid to the given coordinates.
 * Positions that are outside of the grid are ignored.
 *
 * @param x1 The first x-coordinate of the area be extracted.
 * @param y1 The first y-coordinate of the area be extracted.
 * @param x2 The second x-coordinate of the area be extracted.
 * @param y2 The second y-coordinate of the area be extracted.
 * @template T The cell type.
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [ 0,  1,  2,  3],
 *     [ 4,  5,  6,  7],
 *     [ 8,  9, 10, 11],
 *     [12, 13, 14, 15],
 *     [16, 17, 18, 19],
 *     [20, 21, 22, 23],
 *     [24, 25, 26, 27],
 * ]);
 * const croppedGrid = crop(1, 2, 2, 4)(grid);
 * // => {
 * //     x: 1,
 * //     y: 2,
 * //     cellCount: 6,
 * //     columnCount: 2,
 * //     rowCount: 3,
 * //     array2D: [
 * //         [ 9, 10],
 * //         [13, 14],
 * //         [17, 18],
 * //     ],
 * // }
 * ```
 */
export function crop<T>(x1: number, y1: number, x2: number, y2: number): GridTransformer<T>;
export function crop<T>(this: any, ...args: any): GridTransformer<T> {
    return (grid) => {
        const area: Area = isNumber(args[0]) ? coordinatesToArea.apply(this, args as any) : args[0];
        return selectSubGrid({grid, area}) as Grid<T>;
    };
}
