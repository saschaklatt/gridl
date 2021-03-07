import {createGridFromArray2D} from "../../src";
import {moveRow} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D({
    x: 1,
    y: 2,
    array2D: [
        [ 1,  2,  3],
        [ 4,  5,  6],
        [ 7,  8,  9],
        [10, 11, 12],
    ],
});

describe("moveRow", () => {
    it("moves the first row to the end", () => {
        const grid = mockGrid();
        const newGrid = moveRow(0, 3)(grid);
        expect(newGrid).toEqual({
            x: 1,
            y: 2,
            cellCount: 12,
            columnCount: 3,
            rowCount: 4,
            _array2D: [
                [ 4,  5,  6],
                [ 7,  8,  9],
                [10, 11, 12],
                [ 1,  2,  3],
            ],
        });
    });

    it("keeps the position", () => {
        const grid = mockGrid();
        const res = moveRow(0, 3)(grid);
        expect(res.x).toBe(1);
        expect(res.y).toBe(2);
    });

    it("moves the last row to the top", () => {
        const grid = mockGrid();
        const res = moveRow(3, 0)(grid);
        expect(res._array2D).toEqual([
            [10, 11, 12],
            [ 1,  2,  3],
            [ 4,  5,  6],
            [ 7,  8,  9],
        ]);
    });

    it("moves row from a lower y to a higher y position", () => {
        const grid = mockGrid();
        const res = moveRow(1, 2)(grid);
        expect(res._array2D).toEqual([
            [ 1,  2,  3],
            [ 7,  8,  9],
            [ 4,  5,  6],
            [10, 11, 12],
        ]);
    });

    it("moves a row from a higher y to a lower y position", () => {
        const grid = mockGrid();
        const res = moveRow(3, 1)(grid);
        expect(res._array2D).toEqual([
            [ 1,  2,  3],
            [10, 11, 12],
            [ 4,  5,  6],
            [ 7,  8,  9],
        ]);
    });

    it("ignores invalid y-values", () => {
        const grid = mockGrid();

        const resFromTooBig = moveRow(5, 2)(grid);
        const resToTooBig = moveRow(0, 5)(grid);
        const resFromTooSmall = moveRow(-1, 2)(grid);
        const resToTooSmall = moveRow(0, -1)(grid);
        const resToEqualsFrom = moveRow(2, 2)(grid);

        expect(resFromTooBig).toBe(grid);
        expect(resToTooBig).toBe(grid);
        expect(resFromTooSmall).toBe(grid);
        expect(resToTooSmall).toBe(grid);
        expect(resToEqualsFrom).toBe(grid);
    });
});
