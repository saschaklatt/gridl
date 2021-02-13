import {createGridFromArray2D, walkWESN} from "../../src/core";
import {forEachCell} from "../../src/sideEffects";

const mockGrid = () => createGridFromArray2D([
    [1, 2, 3],
    [4, 5, 6],
]);

describe("forEachCell", () => {
    it("iterates over each cell", () => {
        const grid = mockGrid();
        let str = "";
        forEachCell(grid, (cellValue) => {str = `${str}${cellValue}`;});
        expect(str).toEqual("123456");
    });

    it("passes the correct positions to the callback", () => {
        const grid = mockGrid();
        let str = "";
        forEachCell(grid, (_cell, {x, y}) => {str = `${str}[${x},${y}]`;});
        expect(str).toEqual("[0,0][1,0][2,0][0,1][1,1][2,1]");
    });

    it("passes the correct index to the callback", () => {
        const grid = mockGrid();
        let str = "";
        forEachCell(grid, (_cell, _pos, idx) => {str = `${str}${idx}`;});
        expect(str).toEqual("012345");
    });

    it("passes the correct src grid to the callback", () => {
        const grid = mockGrid();
        let count = 0;
        forEachCell(grid, (_cell, _pos, _idx, src) => {
            expect(src).toBe(grid);
            count++;
        });
        expect(count).toBe(6);
    });

    it("iterates over each cell with another iterator", () => {
        const grid = mockGrid();
        let str = "";
        forEachCell(grid, (cellValue) => {str = `${str}${cellValue}`;}, walkWESN);
        expect(str).toEqual("456123");
    });
});
