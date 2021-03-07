import {createGridFromArray2D} from "../../src";
import {moveColumn} from "../../src/transformers";

describe("moveColumn", () => {
    it("moves column from a to b", () => {
        const grid = createGridFromArray2D([
            [0, 1,  2,  3],
            [4, 5,  6,  7],
            [8, 9, 10, 11],
        ]);
        const fromX = 2;
        const toX = 1;
        const newGrid = moveColumn(fromX, toX)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 4,
            rowCount: 3,
            array2D: [
                [0,  2, 1,  3],
                [4,  6, 5,  7],
                [8, 10, 9, 11],
            ],
        });
    });

    it("moves the first column to the end", () => {
        const grid = createGridFromArray2D([
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ]);
        const res = moveColumn(0, 2)(grid);
        expect(res.array2D).toEqual([
            [1, 2, 0],
            [4, 5, 3],
            [7, 8, 6],
        ]);
    });

    it("moves the last column to the front", () => {
        const grid = createGridFromArray2D([
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ]);
        const res = moveColumn(2, 0)(grid);
        expect(res.array2D).toEqual([
            [2, 0, 1],
            [5, 3, 4],
            [8, 6, 7],
        ]);
    });

    it("ignores invalid x-values", () => {
        const grid = createGridFromArray2D([
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ]);
        const resTooBigFrom = moveColumn(3, 0)(grid);
        const resTooBigTo = moveColumn(2, 3)(grid);
        const resTooSmallFrom = moveColumn(2, -1)(grid);
        const resTooSmallTo = moveColumn(2, -1)(grid);
        const resFromEqualsTo = moveColumn(1, 1)(grid);

        expect(resTooBigFrom).toBe(grid);
        expect(resTooBigTo).toBe(grid);
        expect(resTooSmallFrom).toBe(grid);
        expect(resTooSmallTo).toBe(grid);
        expect(resFromEqualsTo).toBe(grid);
    });
});
