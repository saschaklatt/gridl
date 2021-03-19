import {createGridFromArray2D} from "../../src/core";
import {findMax} from "../../src/search";

describe("findMax", () => {
    it("finds the max value", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, 2, 8],
            [0, 2, 3, 4],
        ]);
        const res = findMax(grid);
        expect(res).toEqual(8);
    });

    it("find undefined for empty arrays", () => {
        expect(findMax(createGridFromArray2D([]))).toBe(undefined);
        expect(findMax(createGridFromArray2D([[]]))).toBe(undefined);
    });

    it("find the only value an 1x1 grid", () => {
        expect(findMax(createGridFromArray2D([[666]]))).toBe(666);
    });
});
