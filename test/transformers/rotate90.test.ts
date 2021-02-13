import {createGridFromArray2D} from "../../src";
import {rotate90} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D({
    x: 1,
    y: 2,
    array2D: [
        [0, 1,  2,  3],
        [4, 5,  6,  7],
        [8, 9, 10, 11],
    ],
});

describe("rotate90", () => {
    describe("clockwise", () => {
        it("rotates 0 times", () => {
            const grid = mockGrid();
            const rotatedGrid = rotate90(0)(grid);
            expect(rotatedGrid).toBe(grid);
        });

        it("rotates 1 time", () => {
            const grid = mockGrid();
            const rotatedGrid = rotate90(1)(grid);
            expect(rotatedGrid).toEqual({
                x: 1,
                y: 2,
                cellCount: 12,
                columnCount: 3,
                rowCount: 4,
                _array2D: [
                    [ 8, 4, 0],
                    [ 9, 5, 1],
                    [10, 6, 2],
                    [11, 7, 3],
                ],
            });
            expect(rotatedGrid).not.toBe(grid);
        });

        it("rotates 2 times", () => {
            const grid = mockGrid();
            const rotatedGrid = rotate90(2)(grid);
            expect(rotatedGrid.x).toBe(1);
            expect(rotatedGrid.y).toBe(2);
            expect(rotatedGrid._array2D).toEqual([
                [11, 10, 9, 8],
                [ 7,  6, 5, 4],
                [ 3,  2, 1, 0],
            ]);
            expect(rotatedGrid).not.toBe(grid);
        });

        it("rotates 3 times", () => {
            const grid = mockGrid();
            const rotatedGrid = rotate90(3)(grid);
            expect(rotatedGrid.x).toBe(1);
            expect(rotatedGrid.y).toBe(2);
            expect(rotatedGrid._array2D).toEqual([
                [3, 7, 11],
                [2, 6, 10],
                [1, 5,  9],
                [0, 4,  8],
            ]);
            expect(rotatedGrid).not.toBe(grid);
        });

        it("rotates 4 times", () => {
            const grid = mockGrid();
            const rotatedGrid = rotate90(4)(grid);
            expect(rotatedGrid.x).toBe(1);
            expect(rotatedGrid.y).toBe(2);
            expect(rotatedGrid).toBe(grid);
        });

        it("rotates 5 times", () => {
            const grid = mockGrid();
            expect(rotate90(5)(grid)._array2D).toEqual([
                [ 8, 4, 0],
                [ 9, 5, 1],
                [10, 6, 2],
                [11, 7, 3],
            ]);
        });

        it("rotates 6 times", () => {
            const grid = mockGrid();
            expect(rotate90(6)(grid)._array2D).toEqual([
                [11, 10, 9, 8],
                [ 7,  6, 5, 4],
                [ 3,  2, 1, 0],
            ]);
        });

        it("rotates 7 times", () => {
            const grid = mockGrid();
            expect(rotate90(7)(grid)._array2D).toEqual([
                [3, 7, 11],
                [2, 6, 10],
                [1, 5,  9],
                [0, 4,  8],
            ]);
        });
    });

    describe("counterclockwise", () => {
        it("rotates -1 time", () => {
            const grid = mockGrid();
            expect(rotate90(-1)(grid)._array2D).toEqual([
                [3, 7, 11],
                [2, 6, 10],
                [1, 5,  9],
                [0, 4,  8],
            ]);
        });

        it("rotates -2 times", () => {
            const grid = mockGrid();
            expect(rotate90(-2)(grid)._array2D).toEqual([
                [11, 10, 9, 8],
                [ 7,  6, 5, 4],
                [ 3,  2, 1, 0],
            ]);
        });

        it("rotates -3 times", () => {
            const grid = mockGrid();
            expect(rotate90(-3)(grid)._array2D).toEqual([
                [ 8, 4, 0],
                [ 9, 5, 1],
                [10, 6, 2],
                [11, 7, 3],
            ]);
        });

        it("rotates -4 times", () => {
            const grid = mockGrid();
            expect(rotate90(-4)(grid)._array2D).toEqual(grid._array2D);
        });

        it("rotates -5 times", () => {
            const grid = mockGrid();
            expect(rotate90(-5)(grid)._array2D).toEqual([
                [3, 7, 11],
                [2, 6, 10],
                [1, 5,  9],
                [0, 4,  8],
            ]);
        });

        it("rotates -6 times", () => {
            const grid = mockGrid();
            expect(rotate90(-6)(grid)._array2D).toEqual([
                [11, 10, 9, 8],
                [ 7,  6, 5, 4],
                [ 3,  2, 1, 0],
            ]);
        });

        it("rotates -7 times", () => {
            const grid = mockGrid();
            expect(rotate90(-7)(grid)._array2D).toEqual([
                [ 8, 4, 0],
                [ 9, 5, 1],
                [10, 6, 2],
                [11, 7, 3],
            ]);
        });
    });

    describe("mutation", () => {
        it("creates a new reference when transformations are applied", () => {
            const grid = mockGrid();
            expect(rotate90(-3)(grid)).not.toBe(grid);
            expect(rotate90(-2)(grid)).not.toBe(grid);
            expect(rotate90(-1)(grid)).not.toBe(grid);
            expect(rotate90(1)(grid)).not.toBe(grid);
            expect(rotate90(2)(grid)).not.toBe(grid);
            expect(rotate90(3)(grid)).not.toBe(grid);
            expect(rotate90(5)(grid)).not.toBe(grid);
            expect(rotate90(6)(grid)).not.toBe(grid);
            expect(rotate90(7)(grid)).not.toBe(grid);
            expect(rotate90(9)(grid)).not.toBe(grid);
        });

        it("creates no new reference when no transformations are applied", () => {
            const grid = mockGrid();
            expect(rotate90(-8)(grid)).toBe(grid);
            expect(rotate90(-4)(grid)).toBe(grid);
            expect(rotate90(0)(grid)).toBe(grid);
            expect(rotate90(4)(grid)).toBe(grid);
            expect(rotate90(8)(grid)).toBe(grid);
        });
    });
});
