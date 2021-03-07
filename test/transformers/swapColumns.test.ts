import {createGridFromArray2D} from "../../src";
import {swapColumns} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [0,  1,  2],
    [3,  4,  5],
    [6,  7,  8],
    [9, 10, 11],
]);

describe("swapColumns", () => {
    it("swaps two existing columns", () => {
        const grid = mockGrid();
        const newGrid = swapColumns(1, 2)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 3,
            rowCount: 4,
            array2D: [
                [0,  2,  1],
                [3,  5,  4],
                [6,  8,  7],
                [9, 11, 10],
            ],
        });
    });

    it("ignores columns outside the grid", () => {
        const grid = mockGrid();
        expect(swapColumns(-1,  1)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapColumns( 1, -1)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapColumns( 1,  3)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapColumns( 3,  1)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapColumns(-1,  3)(grid).array2D).toEqual(mockGrid().array2D);
    });
});
