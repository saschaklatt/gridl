import {createGridFromArray2D} from "../../src";
import {removeColumnRight} from "../../src/transformers";

describe("removeColumnRight", () => {
    it("removes the right column from a filled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        const newGrid = removeColumnRight()(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 6,
            columnCount: 2,
            rowCount: 3,
            array2D: [
                [1, 2],
                [4, 5],
                [7, 8],
            ],
        });
    });

    it("does nothing on an empty grid", () => {
        const result = removeColumnRight()(createGridFromArray2D([]));
        expect(result.array2D).toEqual([]);
    });
});
