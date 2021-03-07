import {createGridFromArray2D} from "../../src";
import {map, mirrorHorizontally, mirrorVertically, removeColumnRight, rotate90, setCell, transformArea} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [ 0,  1,  2,  3,  4,  5],
    [ 6,  7,  8,  9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
]);

describe("transformArea", () => {
    it("transforms an area (docs example)", () => {
        const grid = mockGrid();
        const area = {x: 2, y: 1, columnCount: 2, rowCount: 3};
        const newGrid = transformArea(area, [
            map((_cell, pos) => pos.x < 1 ? 1 : 2),
            setCell({x: 1, y: 1}, 666),
            rotate90(1),
            removeColumnRight(),
        ])(grid);

        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 30,
            columnCount: 6,
            rowCount: 5,
            array2D: [
                [ 0,  1,  2,   3,  4,  5],
                [ 6,  7,  1,   1, 10, 11],
                [12, 13,  2, 666, 16, 17],
                [18, 19, 20,  21, 22, 23],
                [24, 25, 26,  27, 28, 29],
            ],
        });
    });

    it("transforms an area", () => {
        const grid = mockGrid();
        const areaDef = {x: 2, y: 1, columnCount: 2, rowCount: 3};
        const result = transformArea(areaDef, [
            mirrorHorizontally(),
            mirrorVertically(),
        ])(grid);

        expect(result.array2D).toEqual([
            [ 0,  1,  2,  3,  4,  5],
            [ 6,  7, 21, 20, 10, 11],
            [12, 13, 15, 14, 16, 17],
            [18, 19,  9,  8, 22, 23],
            [24, 25, 26, 27, 28, 29],
        ]);
    });

    it("ignores negative positions outside the grid", () => {
        const grid = mockGrid();
        const area = {x: -1, y: -1, columnCount: 3, rowCount: 3};
        const result = transformArea(area, [
            mirrorHorizontally(),
            mirrorVertically(),
        ])(grid);

        expect(result.array2D).toEqual([
            [ 7,  6,  2,  3,  4,  5],
            [ 1,  0,  8,  9, 10, 11],
            [12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23],
            [24, 25, 26, 27, 28, 29],
        ]);
    });

    it("ignores positive positions outside the grid", () => {
        const grid = mockGrid();
        const area = {x: 4, y: 3, columnCount: 3, rowCount: 3};
        const result = transformArea(area, [
            mirrorHorizontally(),
            mirrorVertically(),
        ])(grid);

        expect(result.array2D).toEqual([
            [ 0,  1,  2,  3,  4,  5],
            [ 6,  7,  8,  9, 10, 11],
            [12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 29, 28],
            [24, 25, 26, 27, 23, 22],
        ]);
    });
});
