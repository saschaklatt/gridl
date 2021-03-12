import {createGrid, createGridFromArray2D} from "../../src/core";
import {isEmptyGrid} from "../../src/reducers";

describe("isEmptyGrid", () => {
    it("returns false for an none-empty grid", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        expect(isEmptyGrid(grid)).toBe(false);
    });

    it("returns true for an empty grid", () => {
        const grid = createGrid({columnCount: 0, rowCount: 0, createCell: () => 5});
        expect(isEmptyGrid(grid)).toBe(true);
        expect(isEmptyGrid(undefined as any)).toBe(true);
        expect(isEmptyGrid(null as any)).toBe(true);
        expect(isEmptyGrid<any>({cellCount: 0, columnCount: 0, rowCount: 0, array2D: [[]], x: 0, y: 0})).toBe(true);
    });
});
