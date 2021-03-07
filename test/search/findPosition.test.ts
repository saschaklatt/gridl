import {createGridFromArray2D, walkEWSN, walkSNEW} from "../../src/core";
import {selectCell} from "../../src/core/selectors";
import {FindCallback, findPosition} from "../../src/search";

describe("findPosition", () => {
    it("finds the first occurence with callback", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, "test", 8],
            [1, "test", 3, 4],
        ]);
        const res1 = findPosition(grid, (v) => v > 2);
        const res2 = findPosition(grid, (v) => typeof v === "string");
        expect(res1).toEqual({x: 3, y: 0});
        expect(res2).toEqual({x: 2, y: 1});
    });

    it("finds the first occurence with value", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, "test", 8],
            [1, "test", 3, 4],
        ]);
        const res1 = findPosition(grid, 4);
        const res2 = findPosition(grid, "test");
        expect(res1).toEqual({x: 3, y: 0});
        expect(res2).toEqual({x: 2, y: 1});
    });

    it("finds the first occurence with another iterator", () => {
        const grid = createGridFromArray2D([
            [1, 1, 1, 4],
            [5, 6, "test", 8],
            [1, "test", 3, 4],
        ]);
        const res1 = findPosition(grid, 4, walkSNEW);
        const res2 = findPosition(grid, "test", walkEWSN);
        expect(res1).toEqual({x: 3, y: 2});
        expect(res2).toEqual({x: 1, y: 2});
    });

    it("finds no position", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
        ]);
        const res = findPosition(grid, (v) => v > 4);
        expect(res).toEqual(undefined);
    });

    it("works with an empty grid", () => {
        const emptyGrid1 = createGridFromArray2D<number>([]);
        const emptyGrid2 = createGridFromArray2D<number>([[]]);
        const res1 = findPosition(emptyGrid1, (v) => v > 0);
        const res2 = findPosition(emptyGrid2, (v) => v > 0);
        expect(res1).toEqual(undefined);
        expect(res2).toEqual(undefined);
    });

    it("passes the expected arguments to the callback", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3],
        ]);
        const expectedThisArg = "test";

        let callbackWasRun = false;
        let localIdx = 0;

        const callback: FindCallback<number> = function(this: any, value, position, index, src) {
            callbackWasRun = true;
            expect(this).toBe(expectedThisArg);
            expect(value).toEqual(selectCell({...position, grid}));
            expect(index).toEqual(localIdx++);
            expect(src).toEqual(grid);
            return false;
        };
        findPosition(grid, callback.bind(expectedThisArg));

        expect(callbackWasRun).toBe(true);
    });
});
