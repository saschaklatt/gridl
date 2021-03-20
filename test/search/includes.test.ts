import {createGridFromArray2D, walkNSWE} from "../../src/core";
import {includes} from "../../src/search";

describe("includes", () => {
    it("works with numbers", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, 2, 8],
            [0, 2, 3, 4],
        ]);
        expect(includes(grid, 2)).toBe(true);
        expect(includes(grid, 10)).toBe(false);
    });

    it("works with objects", () => {
        const cell1 = {v: 6};
        const cell2 = {v: 6};
        const grid = createGridFromArray2D([
            [{v: 1}, {v: 1}, {v: 1}, {v: 4}],
            [{v: 5}, cell1, {v: 2}, {v: 8}],
            [{v: 0}, {v: 2}, {v: 3}, {v: 4}],
        ]);
        expect(includes(grid, cell1)).toBe(true);
        expect(includes(grid, cell2)).toBe(false);
    });

    it("works with another walker", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, 2, 8],
            [0, 2, 3, 4],
        ]);
        expect(includes(grid, 2, walkNSWE)).toBe(true);
        expect(includes(grid, 10, walkNSWE)).toBe(false);
    });
});
