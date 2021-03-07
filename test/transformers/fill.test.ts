import {createGrid} from "../../src";
import {fill} from "../../src/transformers";

describe("fill", () => {
    it("fills all cells with the given value", () => {
        const grid = createGrid({columnCount: 4, rowCount: 5, createCell: () => 0});
        const newGrid = fill(6)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 20,
            columnCount: 4,
            rowCount: 5,
            _array2D: [
                [6, 6, 6, 6],
                [6, 6, 6, 6],
                [6, 6, 6, 6],
                [6, 6, 6, 6],
                [6, 6, 6, 6],
            ],
        });
    });
});
