import {createGridFromArray2D} from "../../src";
import {crop} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [ 0,  1,  2,  3],
    [ 4,  5,  6,  7],
    [ 8,  9, 10, 11],
    [12, 13, 14, 15],
    [16, 17, 18, 19],
    [20, 21, 22, 23],
    [24, 25, 26, 27],
]);

describe("crop", () => {
    it("extracts a complete area", () => {
        const grid = mockGrid();
        const croppedGrid = crop(1, 2, 2, 4)(grid);
        expect(croppedGrid).toEqual({
            x: 1,
            y: 2,
            cellCount: 6,
            columnCount: 2,
            rowCount: 3,
            _array2D: [
                [ 9, 10],
                [13, 14],
                [17, 18],
            ],
        });
    });

    it("works with an areaDefinition", () => {
        const result1 = crop(1, 2, 2, 4)(mockGrid());
        const result2 = crop({x: 1, y: 2, columnCount: 2, rowCount: 3})(mockGrid());
        expect(result1).toEqual(result2);
        expect(result1).toEqual({
            x: 1,
            y: 2,
            cellCount: 6,
            columnCount: 2,
            rowCount: 3,
            _array2D: [
                [ 9, 10],
                [13, 14],
                [17, 18],
            ],
        });
    });

    it("ignores outside west positions", () => {
        const grid = mockGrid();
        const result = crop(-1, 2, 0, 4)(grid);
        expect(result._array2D).toEqual([
            [ 8],
            [12],
            [16],
        ]);
    });

    it("ignores outside north positions", () => {
        const grid = mockGrid();
        const result = crop(0, -1, 2, 2)(grid);
        expect(result._array2D).toEqual([
            [0, 1,  2],
            [4, 5,  6],
            [8, 9, 10],
        ]);
    });

    it("ignores outside south positions", () => {
        const grid = mockGrid();
        const result = crop(1, 5, 3, 8)(grid);
        expect(result._array2D).toEqual([
            [21, 22, 23],
            [25, 26, 27],
        ]);
    });

    it("ignores outside east positions", () => {
        const grid = mockGrid();
        const result = crop(2, 1, 5, 2)(grid);
        expect(result._array2D).toEqual([
            [ 6,  7],
            [10, 11],
        ]);
    });
});
