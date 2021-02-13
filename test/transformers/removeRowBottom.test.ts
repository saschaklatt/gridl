import {createGridFromArray2D} from "../../src";
import {removeRowBottom} from "../../src/transformers";

describe("removeRowBottom", () => {
    it("removes the bottom row from a filled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        const newGrid = removeRowBottom()(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 6,
            columnCount: 3,
            rowCount: 2,
            _array2D: [
                [1, 2, 3],
                [4, 5, 6],
            ],
        });
    });

    it("does nothing on an empty grid", () => {
        const result = removeRowBottom()(createGridFromArray2D([]));
        expect(result._array2D).toEqual([]);
    });
});
