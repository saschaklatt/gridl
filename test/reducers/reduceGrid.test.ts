import {createGridFromArray2D, walkSNEW} from "../../src/core";
import {reduceGrid} from "../../src/reducers";

describe("reduceGrid", () => {
    it("reduces a grid to a number", () => {
        const grid = createGridFromArray2D([
            [1, 2, 3],
            [4, 5, 6],
        ]);
        const initialValue = 10;
        const sum = reduceGrid(grid, (acc, cellValue: number) => acc + cellValue, initialValue);

        expect(sum).toEqual(initialValue + 1 + 2 + 3 + 4 + 5 + 6);
    });

    it("reduces the grid to a string", () => {
        const grid = createGridFromArray2D([
            [0, 1, 2],
            [3, 4, 5],
        ]);
        const initialValue = "";
        const result = reduceGrid(grid, (acc, cellValue) => `${acc}${cellValue}`, initialValue);

        expect(result).toEqual("012345");
    });

    it("works with another iterator", () => {
        const grid = createGridFromArray2D([
            [0, 1, 2],
            [3, 4, 5],
        ]);
        const initialValue = "";
        const result = reduceGrid(grid, (acc, cellValue) => `${acc}${cellValue}`, initialValue, walkSNEW);

        expect(result).toEqual("524130");
    });

    it("reduces the grid to an object", () => {
        const grid = createGridFromArray2D([
            [4, 5, 3],
            [2, 0, 1],
        ]);
        const initialValue = {
            minValue: Infinity,
            maxValue: -Infinity,
        };
        const result = reduceGrid(grid, (acc, cellValue) => ({
            minValue: Math.min(cellValue, acc.minValue),
            maxValue: Math.max(cellValue, acc.maxValue),
        }), initialValue);

        expect(result).toEqual({minValue: 0, maxValue: 5});
    });

    it("returns the initial value when iterating over an empty grid", () => {
        const grid = createGridFromArray2D([]);
        const initialValue = "initital value";
        const result = reduceGrid(grid, () => "updated value", initialValue);

        expect(result).toBe(initialValue);
    });
});
