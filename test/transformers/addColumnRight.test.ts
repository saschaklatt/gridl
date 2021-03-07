import {createGridFromArray2D} from "../../src";
import {addColumnRight} from "../../src/transformers";

describe("addColumnRight", () => {
    it("adds a new column to a prefilled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newCol = [8, 9];
        const res = addColumnRight(newCol)(grid);
        expect(res).toEqual({
            x: 0,
            y: 0,
            cellCount: 8,
            columnCount: 4,
            rowCount: 2,
            array2D: [
                [1, 2, 3, 8],
                [4, 5, 6, 9],
            ],
        });
    });

    it("adds a new column to an empty grid", () => {
        const grid = createGridFromArray2D<number>([]);
        const newColumn = [7, 8, 9];
        const res = addColumnRight(newColumn)(grid);

        expect(res.array2D).toEqual([
            [7],
            [8],
            [9],
        ]);
    });
});
