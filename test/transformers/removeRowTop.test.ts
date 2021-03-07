import {createGridFromArray2D} from "../../src";
import {removeRowTop} from "../../src/transformers";

describe("removeRowTop", () => {
    it("should remove a row from a filled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        const newGrid = removeRowTop()(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 6,
            columnCount: 3,
            rowCount: 2,
            array2D: [
                [4, 5, 6],
                [7, 8, 9],
            ],
        });
    });
});
