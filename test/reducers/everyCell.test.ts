import {createGridFromArray2D} from "../../src/core";
import {everyCell, EveryCellPredicate} from "../../src/reducers";

describe("everyCell", () => {
    it("returns true if all values meet the criteria", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const allLessThan10: EveryCellPredicate<number> = (cell) => cell < 10;
        expect(everyCell(grid, allLessThan10)).toBe(true);
    });

    it("returns false if not all values meet the criteria", () => {
        const grid = createGridFromArray2D([
            [10, 2, 3],
            [4, 5, 6],
        ]);
        const allLessThan10: EveryCellPredicate<number> = (cell) => cell < 10;
        expect(everyCell(grid, allLessThan10)).toBe(false);
    });
});
