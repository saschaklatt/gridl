import {createGridFromArray2D} from "../../src";
import {shiftColumn} from "../../src/transformers";

describe("shiftColumn", () => {
    describe("shift positive", () => {
        it("shifts the column one step positive", () => {
            const grid = createGridFromArray2D([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            const newGrid = shiftColumn({x: 0, steps: 1})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 9,
                columnCount: 3,
                rowCount: 3,
                array2D: [
                    [7, 2, 3],
                    [1, 5, 6],
                    [4, 8, 9],
                ],
            });
        });

        it("shifts the row column steps positive", () => {
            const grid = createGridFromArray2D([
                [0,  1,  2],
                [3,  4,  5],
                [6,  7,  8],
                [9, 10, 11],
            ]);
            const newGrid = shiftColumn({x: 1, steps: 2})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 3,
                rowCount: 4,
                array2D: [
                    [0,  7,  2],
                    [3, 10,  5],
                    [6,  1,  8],
                    [9,  4, 11],
                ],
            });
        });

        it("shifts the column more steps positive than number columns", () => {
            const grid = createGridFromArray2D([
                [0,  1,  2],
                [3,  4,  5],
                [6,  7,  8],
                [9, 10, 11],
            ]);
            const newGrid = shiftColumn({x: 1, steps: 5})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 3,
                rowCount: 4,
                array2D: [
                    [0, 10,  2],
                    [3,  1,  5],
                    [6,  4,  8],
                    [9,  7, 11],
                ],
            });
        });
    });

    describe("shift negative", () => {
        it("shifts the column one step negative", () => {
            const grid = createGridFromArray2D([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            const newGrid = shiftColumn({x: 0, steps: -1})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 9,
                columnCount: 3,
                rowCount: 3,
                array2D: [
                    [4, 2, 3],
                    [7, 5, 6],
                    [1, 8, 9],
                ],
            });
        });

        it("shifts the column two steps negative", () => {
            const grid = createGridFromArray2D([
                [0,  1,  2],
                [3,  4,  5],
                [6,  7,  8],
                [9, 10, 11],
            ]);
            const newGrid = shiftColumn({x: 1, steps: -2})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 3,
                rowCount: 4,
                array2D: [
                    [0,  7,  2],
                    [3, 10,  5],
                    [6,  1,  8],
                    [9,  4, 11],
                ],
            });
        });

        it("shifts the column more steps negative than number columns", () => {
            const grid = createGridFromArray2D([
                [0,  1,  2],
                [3,  4,  5],
                [6,  7,  8],
                [9, 10, 11],
            ]);
            const newGrid = shiftColumn({x: 1, steps: -5})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 3,
                rowCount: 4,
                array2D: [
                    [0,  4,  2],
                    [3,  7,  5],
                    [6, 10,  8],
                    [9,  1, 11],
                ],
            });
        });
    });

    it("ignores column that are out of scope", () => {
        const grid = createGridFromArray2D([
            [1,  2,  3,  4],
            [5,  6,  7,  8],
            [9, 10, 11, 12],
        ]);
        const newGrid = shiftColumn({x: 10, steps: 5})(grid);
        expect(newGrid).toBe(grid);
    });

    it("ignores 0 steps", () => {
        const grid = createGridFromArray2D([
            [1,  2,  3,  4],
            [5,  6,  7,  8],
            [9, 10, 11, 12],
        ]);
        const newGrid = shiftColumn({x: 1, steps: 0})(grid);
        expect(newGrid).toBe(grid);
    });
});
