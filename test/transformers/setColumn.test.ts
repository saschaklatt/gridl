import {createGrid, createGridFromArray2D} from "../../src";
import {createArray} from "../../src/core/utils";
import {setColumn} from "../../src/transformers";

describe("setColumn", () => {
    it("replaces the column at x = 0", () => {
        const grid = createGridFromArray2D([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const newColumn = [6, 6, 6];
        const newGrid = setColumn(0, newColumn)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 9,
            columnCount: 3,
            rowCount: 3,
            _array2D: [
                [6, 0, 0],
                [6, 0, 0],
                [6, 0, 0],
            ],
        });
    });

    it("replaces the column at x = 1", () => {
        const rowCount = 3;
        const grid = createGrid({columnCount: 3, rowCount, createCell: () => 0});
        const newColumn = createArray(rowCount, () => 6);
        const result = setColumn(1, newColumn)(grid);

        expect(result._array2D).toEqual([
            [0, 6, 0],
            [0, 6, 0],
            [0, 6, 0],
        ]);
    });

    it("replaces the column at x = columnCount - 1", () => {
        const rowCount = 3;
        const grid = createGrid({columnCount: 3, rowCount, createCell: () => 0});
        const newColumn = createArray(rowCount, () => 6);
        const result = setColumn(2, newColumn)(grid);

        expect(result._array2D).toEqual([
            [0, 0, 6],
            [0, 0, 6],
            [0, 0, 6],
        ]);
    });

    it("does nothing if the x is outside the grid (negative)", () => {
        const grid = createGrid({columnCount: 3, rowCount: 3, createCell: () => 0});
        const newColumn = createArray(3, () => 6);
        const result = setColumn(-1, newColumn)(grid);

        expect(result._array2D).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });

    it("injects smaller columns", () => {
        const grid = createGrid({columnCount: 3, rowCount: 3, createCell: () => 0});
        const newColumn = createArray(2, () => 6);
        const result = setColumn(0, newColumn)(grid);

        expect(result._array2D).toEqual([
            [6, 0, 0],
            [6, 0, 0],
            [0, 0, 0],
        ]);
    });

    it("injects bigger columns", () => {
        const grid = createGrid({columnCount: 3, rowCount: 3, createCell: () => 0});
        const newColumn = createArray(4, () => 6);
        const result = setColumn(0, newColumn)(grid);

        expect(result._array2D).toEqual([
            [6, 0, 0],
            [6, 0, 0],
            [6, 0, 0],
        ]);
    });

    describe("offset", () => {
        it("injects smaller columns with yOffset", () => {
            const grid = createGrid({columnCount: 3, rowCount: 4, createCell: () => 0});
            const yOffset = 1;
            const newColumn = createArray(2, () => 6);
            const result = setColumn(0, newColumn, yOffset)(grid);

            expect(result._array2D).toEqual([
                [0, 0, 0],
                [6, 0, 0],
                [6, 0, 0],
                [0, 0, 0],
            ]);
        });

        it("injects bigger columns with yOffset", () => {
            const grid = createGrid({columnCount: 3, rowCount: 4, createCell: () => 0});
            const yOffset = 2;
            const newColumn = createArray(8, () => 6);
            const result = setColumn(0, newColumn, yOffset)(grid);

            expect(result._array2D).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [6, 0, 0],
                [6, 0, 0],
            ]);
        });

        it("injects equal columns with yOffset", () => {
            const rowCount = 4;
            const grid = createGrid({columnCount: 3, rowCount, createCell: () => 0});
            const yOffset = 2;
            const newColumn = createArray(rowCount, () => 6);
            const result = setColumn(0, newColumn, yOffset)(grid);

            expect(result._array2D).toEqual([
                [0, 0, 0],
                [0, 0, 0],
                [6, 0, 0],
                [6, 0, 0],
            ]);
        });

        it("injects equal columns with negative yOffset", () => {
            const rowCount = 4;
            const grid = createGrid({columnCount: 3, rowCount, createCell: () => 0});
            const yOffset = -2;
            const newColumn = createArray(rowCount, () => 6);
            const result = setColumn(0, newColumn, yOffset)(grid);

            expect(result._array2D).toEqual([
                [6, 0, 0],
                [6, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]);
        });
    });
});
