import {createGridFromArray2D} from "../../src";
import {setSubGrid} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D({
    x: 4,
    y: 5,
    array2D: [
        [ 0,  1,  2,  3,  4,  5],
        [ 6,  7,  8,  9, 10, 11],
        [12, 13, 14, 15, 16, 17],
        [18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29],
    ],
});

describe("setSubGrid", () => {
    it("sets all values of the subgrid", () => {
        const grid = createGridFromArray2D([
            [ 0,  1,  2,  3,  4,  5],
            [ 6,  7,  8,  9, 10, 11],
            [12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29],
        ]);
        const subGrid = createGridFromArray2D({
            x: 1,
            y: 2,
            array2D: [
                [6, 6, 6],
                [6, 6, 6],
                [6, 6, 6],
            ],
        });
        const newGrid = setSubGrid(subGrid)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 30,
            columnCount: 6,
            rowCount: 5,
            array2D: [
                [ 0,  1,  2,  3,  4,  5],
                [ 6,  7,  8,  9, 10, 11],
                [12,  6,  6,  6, 16, 17],
                [18,  6,  6,  6, 22, 23],
                [24,  6,  6,  6, 28, 29],
            ],
        });
    });

    it("ignores negative values outside of the grid", () => {
        const subGrid = createGridFromArray2D({
            x: -1,
            y: -1,
            array2D: [
                [6, 6, 6],
                [6, 6, 6],
                [6, 6, 6],
            ],
        });
        const result = setSubGrid(subGrid)(mockGrid());
        expect(result.array2D).toEqual([
            [ 6,  6,  2,  3,  4,  5],
            [ 6,  6,  8,  9, 10, 11],
            [12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29],
        ]);
    });

    it("ignores positive values outside of the grid", () => {
        const subGrid = createGridFromArray2D({
            x: 4,
            y: 3,
            array2D: [
                [6, 6, 6],
                [6, 6, 6],
                [6, 6, 6],
            ],
        });
        const result = setSubGrid(subGrid)(mockGrid());
        expect(result.array2D).toEqual([
            [ 0,  1,  2,  3,  4,  5],
            [ 6,  7,  8,  9, 10, 11],
            [12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21,  6,  6],
            [24, 25, 26, 27,  6,  6],
        ]);
    });

    it("keeps the position of the main grid", () => {
        const subGrid = createGridFromArray2D({
            x: 1,
            y: 2,
            array2D: [
                [6, 6, 6],
                [6, 6, 6],
                [6, 6, 6],
            ],
        });
        const result = setSubGrid(subGrid)(mockGrid());
        expect(result.x).toBe(mockGrid().x);
        expect(result.y).toBe(mockGrid().y);
    });
});
