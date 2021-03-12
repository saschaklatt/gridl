import {createGridFromArray2D} from "../../src/core";
import {noCells} from "../../src/reducers";

describe("noCells", () => {
    it("returns true if no value meets the criteria", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const equal666 = (cell: number) => cell === 666;
        expect(noCells(grid, equal666)).toBe(true);
    });

    it("returns false if a value meets the criteria", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const equal5 = (cell: number) => cell === 5;
        expect(noCells(grid, equal5)).toBe(false);
    });
});
