import {createGridFromArray2D} from "../../src";
import {mirrorHorizontally} from "../../src/transformers";

describe("mirrorHorizontally", () => {
    it("mirrors the grid horizontally", () => {
        const grid = createGridFromArray2D([
            [0,  1,  2],
            [3,  4,  5],
            [6,  7,  8],
            [9, 10, 11],
        ]);
        const mirroredGrid = mirrorHorizontally()(grid);
        expect(mirroredGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 3,
            rowCount: 4,
            _array2D: [
                [9, 10, 11],
                [6,  7,  8],
                [3,  4,  5],
                [0,  1,  2],
            ],
        });
    });

    it("makes copies of the rows", () => {
        const grid = createGridFromArray2D([
            [0,  1,  2],
            [3,  4,  5],
            [6,  7,  8],
            [0, 10, 11],
        ]);
        const mirroredGrid = mirrorHorizontally()(grid);
        expect(mirroredGrid._array2D[0]).not.toBe(grid._array2D[3]);
        expect(mirroredGrid._array2D[1]).not.toBe(grid._array2D[2]);
        expect(mirroredGrid._array2D[2]).not.toBe(grid._array2D[1]);
        expect(mirroredGrid._array2D[3]).not.toBe(grid._array2D[0]);
    });

    it("mirrors an empty grid", () => {
        const grid = createGridFromArray2D([[]]);
        const mirroredGrid = mirrorHorizontally()(grid);
        expect(mirroredGrid._array2D).toEqual([]);
    });

    it("mirrors an empty array", () => {
        const grid = createGridFromArray2D([]);
        const mirroredGrid = mirrorHorizontally()(grid);
        expect(mirroredGrid._array2D).toEqual([]);
    });
});
