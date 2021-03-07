import {createGridFromArray2D} from "../../src";
import {removeColumnLeft} from "../../src/transformers";

describe("removeColumnLeft", () => {
    it("removes the left column from a filled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        const newGrid = removeColumnLeft()(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 6,
            columnCount: 2,
            rowCount: 3,
            _array2D: [
                [2, 3],
                [5, 6],
                [8, 9],
            ],
        });
    });

    it("does nothing on an empty grid", () => {
        const result = removeColumnLeft()(createGridFromArray2D([]));
        expect(result._array2D).toEqual([]);
    });
});
