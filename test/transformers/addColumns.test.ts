import {createGridFromArray2D} from "../../src";
import {addColumns} from "../../src/transformers";

describe("addColumns", () => {
    it("adds new columns in the middle of a prefilled grid", () => {
        const grid = createGridFromArray2D([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const newColumns = [
            [ 7,  8,  9],
            [10, 11, 12],
        ];
        const newGrid = addColumns(1, newColumns)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 15,
            columnCount: 5,
            rowCount: 3,
            array2D: [
                [0, 7, 10, 0, 0],
                [0, 8, 11, 0, 0],
                [0, 9, 12, 0, 0],
            ],
        });
    });

    it("adds new columns to the start of a grid", () => {
        const grid = createGridFromArray2D([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const newColumns = [
            [ 7,  8,  9],
            [10, 11, 12],
        ];
        const newGridStart = addColumns(0, newColumns)(grid);
        const newGridOutside = addColumns(-6, newColumns)(grid);

        const expectation = {
            x: 0,
            y: 0,
            cellCount: 15,
            columnCount: 5,
            rowCount: 3,
            array2D: [
                [7, 10, 0, 0, 0],
                [8, 11, 0, 0, 0],
                [9, 12, 0, 0, 0],
            ],
        };

        expect(newGridStart).toEqual(expectation);
        expect(newGridOutside).toEqual(expectation);
    });

    it("adds new columns to the end of a grid", () => {
        const grid = createGridFromArray2D([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const newColumns = [
            [ 7,  8,  9],
            [10, 11, 12],
        ];
        const newGridEnd = addColumns(3, newColumns)(grid);
        const newGridOutside = addColumns(6, newColumns)(grid);

        const expectation = {
            x: 0,
            y: 0,
            cellCount: 15,
            columnCount: 5,
            rowCount: 3,
            array2D: [
                [0, 0, 0, 7, 10],
                [0, 0, 0, 8, 11],
                [0, 0, 0, 9, 12],
            ],
        };

        expect(newGridEnd).toEqual(expectation);
        expect(newGridOutside).toEqual(expectation);
    });

    it("adds a new columns to an empty grid", () => {
        const grid = createGridFromArray2D<number>([]);
        const newColumns = [
            [1, 2, 3],
            [4, 5, 6],
        ];
        const res = addColumns(0, newColumns)(grid);
        expect(res).toEqual({
            x: 0,
            y: 0,
            cellCount: 6,
            columnCount: 2,
            rowCount: 3,
            array2D: [
                [1, 4],
                [2, 5],
                [3, 6],
            ],
        });
    });

    it("does nothing with an empty columns array", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newColumns = [] as number[][];
        const res = addColumns(0, newColumns)(grid);
        expect(res).toBe(grid);
    });

    it("throws an error if a columns has more or less rows than the grid", () => {
        const grid = createGridFromArray2D([
            [1, 4],
            [2, 5],
            [3, 6],
        ]);

        const columnsWithTooManyRows = [
            [1, 2, 3, 4],
            [5, 6, 7],
        ];
        const columnsWithTooFewRows = [
            [1, 2, 3],
            [5, 6],
        ];

        expect(() => addColumns(1, columnsWithTooManyRows)(grid)).toThrow();
        expect(() => addColumns(1, columnsWithTooFewRows)(grid)).toThrow();
    });
});
