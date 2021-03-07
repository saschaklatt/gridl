import {createGridFromArray2D} from "../../src";
import {swapRows} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
]);

describe("swapRows", () => {
    it("swaps to existing rows", () => {
        const grid = mockGrid();
        const newGrid = swapRows(0, 1)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 9,
            columnCount: 3,
            rowCount: 3,
            array2D: [
                [3, 4, 5],
                [0, 1, 2],
                [6, 7, 8],
            ],
        });
    });

    it("ignores y values outside the grid", () => {
        const grid = mockGrid();
        expect(swapRows(-1,  1)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapRows( 1, -1)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapRows( 3,  1)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapRows( 1,  3)(grid).array2D).toEqual(mockGrid().array2D);
        expect(swapRows( 3, -1)(grid).array2D).toEqual(mockGrid().array2D);
    });
});
