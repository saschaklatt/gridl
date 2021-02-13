import {createGrid} from "../../src";
import {removeRow} from "../../src/transformers/removeRow";

const mockGrid = () => createGrid({
    columnCount: 3,
    rowCount: 3,
    x: 1,
    y: 2,
    createCell: (_pos, idx) => idx + 1,
});

describe("removeRow", () => {
    it("removes the row", () => {
        const oldGrid = mockGrid();
        const newGrid = removeRow(1)(oldGrid);
        expect(oldGrid.rowCount).toBe(3);
        expect(newGrid).toEqual({
            x: 1,
            y: 2,
            cellCount: 6,
            columnCount: 3,
            rowCount: 2,
            _array2D: [
                [1, 2, 3],
                [7, 8, 9],
            ],
        });
    });

    it("does nothing when removing from an invalid y-position", () => {
        const grid = mockGrid();
        expect(removeRow(-1)(grid)).toEqual(mockGrid());
        expect(removeRow(10)(grid)).toEqual(mockGrid());
    });
});
