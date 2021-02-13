import {createGridFromArray2D, walkEWSN} from "../../src/core";
import {selectCell} from "../../src/core/selectors";
import {findCell, FindCallback} from "../../src/search";

describe("findCell", () => {
    describe("with default iterator", () => {
        it("finds the first occurence of a number greater than 2", () => {
            const grid = createGridFromArray2D([
                [1, 1, 1, 4],
                [5, 6, 2, 8],
                [0, 2, 3, 4],
            ]);
            const res = findCell(grid, (v) => v > 2);
            expect(res).toEqual(4);
        });

        it("finds the first occurence of a string", () => {
            const grid = createGridFromArray2D([
                [1, 1, 1, 4],
                [5, 6, "test", 8],
                ["pups", 2, 3, 4],
            ]);
            const res = findCell(grid, (v) => typeof v === "string");
            expect(res).toEqual("test");
        });

        it("finds no value", () => {
            const grid = createGridFromArray2D([
                [1, 2, 3, 4],
                [1, 2, 3, 4],
                [1, 2, 3, 4],
            ]);
            const res = findCell(grid, (v) => v > 4);
            expect(res).toEqual(undefined);
        });

        it("works with an empty grid", () => {
            const emptyGrid1 = createGridFromArray2D<number>([]);
            const emptyGrid2 = createGridFromArray2D<number>([[]]);
            expect(findCell(emptyGrid1, (v) => v > 0)).toEqual(undefined);
            expect(findCell(emptyGrid2, (v) => v > 0)).toEqual(undefined);
        });

        it("passes the expected arguments to the callback", () => {
            const grid = createGridFromArray2D([
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
            ]);
            const expectedThisArg = "test";

            let callbackWasExecuted = false;
            let localIdx = 0;

            const callback: FindCallback<number> = function(this: any, value, position, idx, src) {
                callbackWasExecuted = true;
                expect(this).toBe(expectedThisArg);
                expect(value).toEqual(selectCell({...position, grid}));
                expect(idx).toEqual(localIdx++);
                expect(src).toEqual(grid);
                return false;
            };
            findCell(grid, callback.bind(expectedThisArg));
            expect(callbackWasExecuted).toBe(true);
        });
    });

    describe("with other iterators", () => {
        it("finds the last occurence", () => {
            const grid = createGridFromArray2D([
                [1, 1, 1, 4],
                [5, 6, 7, 8],
                [9, 5, 6, 4],
            ]);
            const res = findCell(grid, (v) => v < 4, walkEWSN);
            expect(res).toEqual(1);
        });
    });
});
