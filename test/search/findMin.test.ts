import {createGridFromArray2D} from "../../src/core";
import {findMin} from "../../src/search";

describe("findMin", () => {
    it("finds the max value", () => {
        const grid = createGridFromArray2D([
            [2, 9, 2, 4],
            [5, 6, 2, 8],
            [1, 2, 3, 4],
        ]);
        const res = findMin(grid);
        expect(res).toEqual(1);
    });

    it("find undefined for empty arrays", () => {
        expect(findMin(createGridFromArray2D([]))).toBe(undefined);
        expect(findMin(createGridFromArray2D([[]]))).toBe(undefined);
    });

    it("find the only value an 1x1 grid", () => {
        expect(findMin(createGridFromArray2D([[666]]))).toBe(666);
    });
});
