import {Area} from "../core/types";
import {GridTransformer} from "./types";
import {createGridFromArray2D} from "../core/grid";
import {crop} from "./crop";
import {moveGrid} from "./moveGrid";
import {setSubGrid} from "./setSubGrid";
import {transform} from "./transform";

/**
 * Creates a transformer that combines a series of other transformers and applies them to an area within the grid one by one.
 *
 * @param area The area to be transformed.
 * @param transformerList The list of transformer function to be applied.
 * @template T The cell type.
 *
 * @example ```js
 * const grid = createGridFromArray2D([
 *     [ 0,  1,  2,  3,  4,  5],
 *     [ 6,  7,  8,  9, 10, 11],
 *     [12, 13, 14, 15, 16, 17],
 *     [18, 19, 20, 21, 22, 23],
 *     [24, 25, 26, 27, 28, 29],
 * ]);
 * const area = {x: 2, y: 1, columnCount: 2, rowCount: 3};
 * const newGrid = transformArea(area, [
 *     map((_cell, pos) => pos.x < 1 ? 1 : 2),
 *     setCell({x: 1, y: 1}, 666),
 *     rotate90(1),
 *     removeColumnRight(),
 * ])(grid);
 * // => {
 * //     x: 0,
 * //     y: 0,
 * //     cellCount: 30,
 * //     columnCount: 6,
 * //     rowCount: 5,
 * //     _array2D: [
 * //         [ 0,  1,  2,   3,  4,  5],
 * //         [ 6,  7,  1,   1, 10, 11],
 * //         [12, 13,  2, 666, 16, 17],
 * //         [18, 19, 20,  21, 22, 23],
 * //         [24, 25, 26,  27, 28, 29],
 * //     ],
 * // }
 * ```
 */
export function transformArea<T>(area: Area, transformerList: GridTransformer<T, any>[]): GridTransformer<T> {
    return (grid) => {
        const subGrid = crop<T>(area)(grid);
        const pos = {
            x: Math.max(0, area.x),
            y: Math.max(0, area.y),
        };
        const transformedSubGrid = transform(...[
            ...transformerList,
            moveGrid(pos),
        ])(subGrid);
        return setSubGrid(createGridFromArray2D({...pos, array2D: transformedSubGrid._array2D}))(grid);
    };
}
