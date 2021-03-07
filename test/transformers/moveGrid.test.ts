import {createGridFromArray2D} from "../../src";
import {moveGrid} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]);

describe("moveGrid", () => {
    it("changes the x- and y-values correctly", () => {
        const grid = mockGrid();
        expect(grid).toEqual({...grid, x: 0, y: 0});
        expect(moveGrid({x: 1, y: 2})(grid)).toEqual({...grid, x: 1, y: 2});
        expect(moveGrid({x: -2, y: -4})(grid)).toEqual({...grid, x: -2, y: -4});
    });
});
