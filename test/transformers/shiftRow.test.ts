import {createGridFromArray2D} from "../../src";
import {shiftRow} from "../../src/transformers";

describe("shiftRow", () => {
    describe("shift positive", () => {
        it("shifts the row one step positive", () => {
            const grid = createGridFromArray2D([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            const newGrid = shiftRow({y: 0, steps: 1})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 9,
                columnCount: 3,
                rowCount: 3,
                array2D: [
                    [3, 1, 2],
                    [4, 5, 6],
                    [7, 8, 9],
                ],
            });
        });

        it("shifts the row two steps positive", () => {
            const grid = createGridFromArray2D([
                [1,  2,  3,  4],
                [5,  6,  7,  8],
                [9, 10, 11, 12],
            ]);
            const newGrid = shiftRow({y: 1, steps: 2})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 4,
                rowCount: 3,
                array2D: [
                    [1,  2,  3,  4],
                    [7,  8,  5,  6],
                    [9, 10, 11, 12],
                ],
            });
        });

        it("shifts the row more steps positive than number columns", () => {
            const grid = createGridFromArray2D([
                [1,  2,  3,  4],
                [5,  6,  7,  8],
                [9, 10, 11, 12],
            ]);
            const newGrid = shiftRow({y: 1, steps: 5})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 4,
                rowCount: 3,
                array2D: [
                    [1,  2,  3,  4],
                    [8,  5,  6,  7],
                    [9, 10, 11, 12],
                ],
            });
        });
    });

    describe("shift negative", () => {
        it("shifts the row one step negative", () => {
            const grid = createGridFromArray2D([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
            const newGrid = shiftRow({y: 0, steps: -1})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 9,
                columnCount: 3,
                rowCount: 3,
                array2D: [
                    [2, 3, 1],
                    [4, 5, 6],
                    [7, 8, 9],
                ],
            });
        });

        it("shifts the row two steps negative", () => {
            const grid = createGridFromArray2D([
                [1,  2,  3,  4],
                [5,  6,  7,  8],
                [9, 10, 11, 12],
            ]);
            const newGrid = shiftRow({y: 1, steps: -2})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 4,
                rowCount: 3,
                array2D: [
                    [1,  2,  3,  4],
                    [7,  8,  5,  6],
                    [9, 10, 11, 12],
                ],
            });
        });

        it("shifts the row more steps negative than number columns", () => {
            const grid = createGridFromArray2D([
                [1,  2,  3,  4],
                [5,  6,  7,  8],
                [9, 10, 11, 12],
            ]);
            const newGrid = shiftRow({y: 1, steps: -5})(grid);
            expect(newGrid).toEqual({
                x: 0,
                y: 0,
                cellCount: 12,
                columnCount: 4,
                rowCount: 3,
                array2D: [
                    [1,  2,  3,  4],
                    [6,  7,  8,  5],
                    [9, 10, 11, 12],
                ],
            });
        });
    });

    it("ignores rows that are out of scope", () => {
        const grid = createGridFromArray2D([
            [1,  2,  3,  4],
            [5,  6,  7,  8],
            [9, 10, 11, 12],
        ]);
        const newGrid = shiftRow({y: 10, steps: 5})(grid);
        expect(newGrid).toBe(grid);
    });

    it("ignores 0 steps", () => {
        const grid = createGridFromArray2D([
            [1,  2,  3,  4],
            [5,  6,  7,  8],
            [9, 10, 11, 12],
        ]);
        const newGrid = shiftRow({y: 1, steps: 0})(grid);
        expect(newGrid).toBe(grid);
    });
});
