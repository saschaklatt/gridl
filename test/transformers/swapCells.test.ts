import {createGrid, createGridFromArray2D} from "../../src";
import {swapCells} from "../../src/transformers";

describe("swapCells", () => {
    it("swaps two existing cells", () => {
        const grid = createGridFromArray2D([
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ]);
        const pos1 = {x: 1, y: 0};
        const pos2 = {x: 2, y: 2};
        const newGrid = swapCells(pos1, pos2)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 9,
            columnCount: 3,
            rowCount: 3,
            array2D: [
                [0, 8, 2],
                [3, 4, 5],
                [6, 7, 1],
            ],
        });
    });

    it("swaps two existing cells in an objects-grid", () => {
        const grid = createGridFromArray2D([
            [{value: 0}, {value: 1}, {value: 2}],
            [{value: 3}, {value: 4}, {value: 5}],
            [{value: 6}, {value: 7}, {value: 8}],
        ]);
        const pos1 = {x: 2, y: 2};
        const pos2 = {x: 1, y: 0};
        expect(swapCells(pos1, pos2)(grid).array2D).toEqual([
            [{value: 0}, {value: 8}, {value: 2}],
            [{value: 3}, {value: 4}, {value: 5}],
            [{value: 6}, {value: 7}, {value: 1}],
        ]);
    });

    it("does nothing if the first position is outside the grid", () => {
        const grid = createGridFromArray2D([
            [0, 1,  2,  3],
            [4, 5,  6,  7],
            [8, 9, 10, 11],
        ]);
        const pos1 = {x: 4, y: 0};
        const pos2 = {x: 2, y: 2};
        expect(swapCells(pos1, pos2)(grid)).toBe(grid);
    });

    it("does nothing if the second position is outside the grid", () => {
        const grid = createGridFromArray2D([
            [0, 1,  2,  3],
            [4, 5,  6,  7],
            [8, 9, 10, 11],
        ]);
        const pos1 = {x: 1, y: 0};
        const pos2 = {x: 4, y: 2};
        expect(swapCells(pos1, pos2)(grid)).toBe(grid);
    });

    it("does nothing if the both positions are outside the grid", () => {
        const grid = createGridFromArray2D([
            [0, 1,  2,  3],
            [4, 5,  6,  7],
            [8, 9, 10, 11],
        ]);
        const pos1 = {x: -1, y: 0};
        const pos2 = {x: -4, y: 2};
        expect(swapCells(pos1, pos2)(grid)).toBe(grid);
    });

    it("keeps the position", () => {
        const x = 1;
        const y = 2;
        const grid = createGrid({columnCount: 3, rowCount: 3, x, y, createCell: () => 0});
        const pos1 = {x: 1, y: 0};
        const pos2 = {x: 2, y: 2};
        const res = swapCells(pos1, pos2)(grid);
        expect(res.x).toBe(x);
        expect(res.y).toBe(y);
    });
});
