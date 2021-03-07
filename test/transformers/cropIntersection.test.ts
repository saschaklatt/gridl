import {createGridFromArray2D} from "../../src";
import {cropIntersection} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [ 0,  1,  2,  3,  4],
    [ 5,  6,  7,  8,  9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
]);

describe("cropIntersection", () => {
    it("should crop an the intersecting grid", () => {
        const grid = mockGrid();
        const area = {columnCount: 3, rowCount: 3, x: 2, y: 1};
        const newGrid = cropIntersection(area)(grid);
        expect(newGrid).toEqual({
            cellCount: 9,
            columnCount: 3,
            rowCount: 3,
            x: 2,
            y: 1,
            _array2D: [
                [ 7,  8,  9],
                [12, 13, 14],
                [17, 18, 19],
            ],
        });
    });

    it("should ignore values outside the grid", () => {
        const grid = mockGrid();
        const areaDef = {columnCount: 3, rowCount: 3, x: 3, y: 3};

        const result = cropIntersection(areaDef)(grid);
        expect(result).toEqual({
            cellCount: 4,
            columnCount: 2,
            rowCount: 2,
            x: 3,
            y: 3,
            _array2D: [
                [18, 19],
                [23, 24],
            ],
        });
    });
});
