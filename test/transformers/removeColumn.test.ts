import {createGridFromArray2D} from "../../src";
import {removeColumn} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]);

describe("removeColumn", () => {
    it("should remove a column from a filled grid", () => {
        const grid = mockGrid();
        const newGrid = removeColumn(1)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 6,
            columnCount: 2,
            rowCount: 3,
            array2D: [
                [1, 3],
                [4, 6],
                [7, 9],
            ],
        });
    });

    it("should do nothing when removing from an invalid y-position", () => {
        const grid = mockGrid();
        expect(removeColumn(-1)(grid).array2D).toEqual(grid.array2D);
        expect(removeColumn(10)(grid).array2D).toEqual(grid.array2D);
        expect(removeColumn(10)(grid).array2D).not.toBe(grid.array2D);
    });
});
