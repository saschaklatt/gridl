import {createGridFromArray2D} from "../../src";
import {addRows} from "../../src/transformers";

describe("addRows", () => {
    it("adds new rows in the middle of a prefilled grid", () => {
const grid = createGridFromArray2D([
    [1, 2, 3],
    [4, 5, 6],
]);
const newRows = [
    [ 7,  8,  9],
    [10, 11, 12],
];
const newGrid = addRows(1, newRows)(grid);
expect(newGrid).toEqual({
    x: 0,
    y: 0,
    cellCount: 12,
    columnCount: 3,
    rowCount: 4,
    array2D: [
        [ 1,  2,  3],
        [ 7,  8,  9],
        [10, 11, 12],
        [ 4,  5,  6],
    ],
});
    });

    it("adds new rows to the start of a grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newRows = [
            [ 7,  8,  9],
            [10, 11, 12],
        ];
        const newGridStart = addRows(0, newRows)(grid);
        const newGridOutside = addRows(-6, newRows)(grid);

        const expectation = {
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 3,
            rowCount: 4,
            array2D: [
                [ 7,  8,  9],
                [10, 11, 12],
                [ 1,  2,  3],
                [ 4,  5,  6],
            ],
        };

        expect(newGridStart).toEqual(expectation);
        expect(newGridOutside).toEqual(expectation);
    });

    it("adds new rows to the end of a grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newRows = [
            [ 7,  8,  9],
            [10, 11, 12],
        ];
        const newGridEnd = addRows(2, newRows)(grid);
        const newGridOutside = addRows(6, newRows)(grid);

        const expectation = {
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 3,
            rowCount: 4,
            array2D: [
                [ 1,  2,  3],
                [ 4,  5,  6],
                [ 7,  8,  9],
                [10, 11, 12],
            ],
        };

        expect(newGridEnd).toEqual(expectation);
        expect(newGridOutside).toEqual(expectation);
    });

    it("adds a new rows to an empty grid", () => {
        const grid = createGridFromArray2D<number>([]);
        const newRows = [
            [1, 2, 3],
            [4, 5, 6],
        ];
        const res = addRows(0, newRows)(grid);
        expect(res.array2D).toEqual([
            [1, 2, 3],
            [4, 5, 6],
        ]);
    });

    it("does nothing with en empty rows array", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newRows = [] as number[][];
        const res = addRows(0, newRows)(grid);
        expect(res).toBe(grid);
    });

    it("throws an error if a row has more or less columns than the grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);

        const tooManyColumns = [
            [1, 2, 3, 4],
            [5, 6, 7],
        ];
        const tooFewColumns = [
            [1, 2, 3],
            [5, 6],
        ];

        expect(() => addRows(1, tooManyColumns)(grid)).toThrow();
        expect(() => addRows(1, tooFewColumns)(grid)).toThrow();
    });
});
