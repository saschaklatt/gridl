import {createGridFromArray2D} from "../../src";
import {addRow} from "../../src/transformers";

describe("addRow", () => {
    it("adds a new row to a prefilled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newRow = [7, 8, 9];
        const newGrid = addRow(1, newRow)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 9,
            columnCount: 3,
            rowCount: 3,
            _array2D: [
                [1, 2, 3],
                [7, 8, 9],
                [4, 5, 6],
            ],
        });
    });

    it("adds a new row to an empty grid", () => {
        const grid = createGridFromArray2D<number>([]);
        const newRow = [7, 8, 9];
        const res = addRow(0, newRow)(grid);
        expect(res._array2D).toEqual([
            [7, 8, 9],
        ]);
    });

    it("adds to the start for outside negative y-positions", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newRow = [7, 8, 9];
        const res = addRow(-1, newRow)(grid);
        expect(res._array2D).toEqual([
            [7, 8, 9],
            [1, 2, 3],
            [4, 5, 6],
        ]);
    });

    it("adds to the end for outside positive y-positions", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newRow = [7, 8, 9];
        const res = addRow(6, newRow)(grid);
        expect(res._array2D).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
    });

    it("throws an error if the row has more or less columns than the grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        expect(() => addRow(1, [7, 8, 9, 0])(grid)).toThrow();
        expect(() => addRow(1, [0, 1])(grid)).toThrow();
    });
});
