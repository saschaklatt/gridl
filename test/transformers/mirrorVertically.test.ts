import {createGridFromArray2D} from "../../src";
import {mirrorVertically} from "../../src/transformers";

describe("mirrorVertically", () => {
    it("mirrors the grid vertically", () => {
        const grid = createGridFromArray2D([
            [0,  1,  2],
            [3,  4,  5],
            [6,  7,  8],
            [9, 10, 11],
        ]);
        const mirroredGrid = mirrorVertically()(grid);
        expect(mirroredGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 3,
            rowCount: 4,
            _array2D: [
                [ 2,  1, 0],
                [ 5,  4, 3],
                [ 8,  7, 6],
                [11, 10, 9],
            ],
        });
    });

    it("makes copies of the rows", () => {
        const grid = createGridFromArray2D([
            [0,  1,  2],
            [3,  4,  5],
            [6,  7,  8],
            [9, 10, 11],
        ]);
        const mirroredGrid = mirrorVertically()(grid);
        expect(mirroredGrid._array2D[0]).not.toBe(grid._array2D[3]);
        expect(mirroredGrid._array2D[1]).not.toBe(grid._array2D[2]);
        expect(mirroredGrid._array2D[2]).not.toBe(grid._array2D[1]);
        expect(mirroredGrid._array2D[3]).not.toBe(grid._array2D[0]);
    });

    it("mirrors an empty grid", () => {
        const grid = createGridFromArray2D([[]]);
        const mirroredGrid = mirrorVertically()(grid);
        expect(mirroredGrid._array2D).toEqual([]);
    });

    it("mirrors an empty array", () => {
        const grid = createGridFromArray2D([]);
        const mirroredGrid = mirrorVertically()(grid);
        expect(mirroredGrid._array2D).toEqual([]);
    });
});
