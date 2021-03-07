import {createGridFromArray2D} from "../../src";
import {addColumnLeft} from "../../src/transformers";

describe("addColumnLeft", () => {
    it("adds a new column to a prefilled grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const newCol = [8, 9];
        const res = addColumnLeft(newCol)(grid);
        expect(res).toEqual({
            x: 0,
            y: 0,
            cellCount: 8,
            columnCount: 4,
            rowCount: 2,
            array2D: [
                [8, 1, 2, 3],
                [9, 4, 5, 6],
            ],
        });
    });

    it("adds a new column to an empty grid", () => {
        const grid = createGridFromArray2D<number>([]);
        const newColumn = [7, 8, 9];
        const res = addColumnLeft(newColumn)(grid);

        expect(res.array2D).toEqual([
            [7],
            [8],
            [9],
        ]);
    });
});
