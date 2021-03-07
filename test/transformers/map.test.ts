import {createGridFromArray2D, walkSNEW} from "../../src/core";
import {map, MapCallback} from "../../src/transformers";

const mockGrid = () => createGridFromArray2D([
    [0, 1,  2,  3],
    [4, 5,  6,  7],
    [8, 9, 10, 11],
]);

describe("map", () => {
    it("maps all values to new values of the same type", () => {
        const grid = mockGrid();
        const increaseByOne: MapCallback<number> = (value) => value + 1;
        const increaseAllByOne = map(increaseByOne);
        const mappedGrid = increaseAllByOne(grid);
        expect(mappedGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 4,
            rowCount: 3,
            array2D: [
                [1,  2,  3,  4],
                [5,  6,  7,  8],
                [9, 10, 11, 12],
            ],
        });
    });

    it("maps all values with another iterator", () => {
        const grid = mockGrid();
        const increaseByOne: MapCallback<number> = (value) => value + 1;
        const increaseAllByOne = map(increaseByOne, walkSNEW);
        const mappedGrid = increaseAllByOne(grid);

        expect(mappedGrid.array2D).toEqual([
            [1,  2,  3,  4],
            [5,  6,  7,  8],
            [9, 10, 11, 12],
        ]);
    });

    it("maps all values to a new type", () => {
        const grid = mockGrid();
        const increaseByOne: MapCallback<number, string> = (value) => `${value + 1}`;
        const increaseAllByOne = map(increaseByOne);
        const mappedGrid = increaseAllByOne(grid);

        expect(mappedGrid.array2D).toEqual([
            ["1",  "2",  "3",  "4"],
            ["5",  "6",  "7",  "8"],
            ["9", "10", "11", "12"],
        ]);
    });
});
