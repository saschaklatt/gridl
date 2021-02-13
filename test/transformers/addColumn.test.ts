import {createGridFromArray2D} from "../../src";
import {addColumn} from "../../src/transformers";

describe("addColumn", () => {
    it("adds a new column to a prefilled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newCol = [8, 9];
        const res = addColumn(1, newCol)(grid);

        expect(res).toEqual({
            x: 0,
            y: 0,
            cellCount: 8,
            rowCount: 2,
            columnCount: 4,
            _array2D: [
                [1, 8, 2, 3],
                [4, 9, 5, 6],
            ],
        });
    });

    it("adds a new column to an empty grid", () => {
        const grid = createGridFromArray2D<number>([]);
        const newColumn = [7, 8, 9];
        const res = addColumn(0, newColumn)(grid);
        expect(res._array2D).toEqual([
            [7],
            [8],
            [9],
        ]);
    });

    it("adds to the start for outside negative x-positions", () => {
        const oldGrid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newCol = [8, 9];
        const newGrid = addColumn(-1, newCol)(oldGrid);

        expect(newGrid._array2D).toEqual([
            [8, 1, 2, 3],
            [9, 4, 5, 6],
        ]);
        expect(oldGrid._array2D).toEqual([
            [1, 2, 3],
            [4, 5, 6],
        ]);
    });

    it("adds to the end for outside positive x-positions", () => {
        const oldGrid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newCol = [8, 9];
        const newGrid = addColumn(6, newCol)(oldGrid);

        expect(newGrid._array2D).toEqual([
            [1, 2, 3, 8],
            [4, 5, 6, 9],
        ]);
        expect(oldGrid._array2D).toEqual([
            [1, 2, 3],
            [4, 5, 6],
        ]);
    });

    it("throws an error for invalid column sizes", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        expect(() => addColumn(0, [1])(grid)).toThrow();
        expect(() => addColumn(0, [1, 2, 3])(grid)).toThrow();
    });
});
