import {createGridFromArray2D, swapCellGroups} from "../../src";

describe("swapCellGroups", () => {
    it("swaps cell groups with primitives", () => {
        const grid = createGridFromArray2D([
            [ 0,  1,  2,  3],
            [ 4,  5,  6,  7],
            [ 8,  9, 10, 11],
            [12, 13, 14, 15],
        ]);
        const shape = {columnCount: 2, rowCount: 2};
        const positionA = {x: 0, y: 0};
        const positionB = {x: 2, y: 2};
        const newGrid = swapCellGroups(shape, positionA, positionB)(grid);

        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 16,
            columnCount: 4,
            rowCount: 4,
            array2D: [
                [10, 11,  2,  3],
                [14, 15,  6,  7],
                [ 8,  9,  0,  1],
                [12, 13,  4,  5],
            ],
        });
    });

    it("swaps overlapping non-primitive cells", () => {
        const grid = createGridFromArray2D([
            [{v: 0}, {v:  1}, {v:  2}, {v:  3}],
            [{v: 4}, {v:  5}, {v:  6}, {v:  7}],
            [{v: 8}, {v:  9}, {v: 10}, {v: 11}],
            [{v:12}, {v: 13}, {v: 14}, {v: 15}],
        ]);
        const shape = {columnCount: 2, rowCount: 2};
        const positionA = {x: 0, y: 0};
        const positionB = {x: 1, y: 1};
        const newGrid = swapCellGroups(shape, positionA, positionB)(grid);

        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 16,
            columnCount: 4,
            rowCount: 4,
            array2D: [
                [{v: 5}, {v:  6}, {v:  2}, {v:  3}],
                [{v: 9}, {v: 10}, {v:  1}, {v:  7}],
                [{v: 8}, {v:  4}, {v:  5}, {v: 11}],
                [{v:12}, {v: 13}, {v: 14}, {v: 15}],
            ],
        });
    });

    it("ignores cells that are outside the grid of the first group", () => {
        const grid = createGridFromArray2D([
            [ 0,  1,  2,  3],
            [ 4,  5,  6,  7],
            [ 8,  9, 10, 11],
            [12, 13, 14, 15],
        ]);
        const shape = {columnCount: 2, rowCount: 2};
        const positionA = {x: -1, y: -1};
        const positionB = {x: 2, y: 2};
        const newGrid = swapCellGroups(shape, positionA, positionB)(grid);

        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 16,
            columnCount: 4,
            rowCount: 4,
            array2D: [
                [15,  1,  2,  3],
                [ 4,  5,  6,  7],
                [ 8,  9, undefined, undefined],
                [12, 13, undefined,  0],
            ],
        });
    });

    it("ignores cells that are outside the grid of the second group", () => {
        const grid = createGridFromArray2D([
            [ 0,  1,  2,  3],
            [ 4,  5,  6,  7],
            [ 8,  9, 10, 11],
            [12, 13, 14, 15],
        ]);
        const shape = {columnCount: 2, rowCount: 2};
        const positionA = {x: 0, y: 0};
        const positionB = {x: 3, y: 3};
        const newGrid = swapCellGroups(shape, positionA, positionB)(grid);

        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 16,
            columnCount: 4,
            rowCount: 4,
            array2D: [
                [15,  undefined,  2,  3],
                [undefined,  undefined,  6,  7],
                [ 8,  9, 10, 11],
                [12, 13, 14,  0],
            ],
        });
    });
});
