import {createGridFromArray2D, walkNSWE} from "../../src/core";
import {includesWhere} from "../../src/search";

describe("includesWhere", () => {
    it("works with numbers", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, 2, 8],
            [0, 2, 3, 4],
        ]);
        expect(includesWhere(grid, (cell) => cell > 2)).toBe(true);
        expect(includesWhere(grid, (cell) => cell > 10)).toBe(false);
    });

    it("works with objects", () => {
        const grid = createGridFromArray2D([
            [{v: 1}, {v: 1}, {v: 1}, {v: 4}],
            [{v: 5}, {v: 6}, {v: 2}, {v: 8}],
            [{v: 0}, {v: 2}, {v: 3}, {v: 4}],
        ]);
        expect(includesWhere(grid, (cell) => cell.v === 6)).toBe(true);
        expect(includesWhere(grid, (cell) => cell.v === 9)).toBe(false);
    });

    it("works with another walker", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, 2, 8],
            [0, 2, 3, 4],
        ]);
        expect(includesWhere(grid, (cell) => cell > 2, walkNSWE)).toBe(true);
        expect(includesWhere(grid, (cell) => cell > 10, walkNSWE)).toBe(false);
    });
});
