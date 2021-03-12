import {createGridFromArray2D} from "../../src/core";
import {someCells} from "../../src/reducers";

describe("someCells", () => {
    it("returns true if one value meets the criteria", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const equal5 = (cell: number) => cell === 5;
        expect(someCells(grid, equal5)).toBe(true);
    });

    it("returns false if no value meets the criteria", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const greaterThan10 = (cell: number) => cell > 10;
        expect(someCells(grid, greaterThan10)).toBe(false);
    });
});
