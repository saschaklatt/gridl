import {createGrid, createGridFromArray2D} from "../../src";
import {createArray} from "../../src/core/utils";
import {setRow} from "../../src/transformers";

describe("setRow", () => {
    it("replaces a row at y = 0", () => {
        const grid = createGridFromArray2D([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        const newRow = [6, 6, 6];
        const newGrid = setRow(0, newRow)(grid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 9,
            columnCount: 3,
            rowCount: 3,
            _array2D: [
                [6, 6, 6],
                [0, 0, 0],
                [0, 0, 0],
            ],
        });
    });

    it("replaces a row at y = 1", () => {
        const columnCount = 3;
        const grid = createGrid({columnCount, rowCount: 3, createCell: () => 0});
        const newRow = createArray(columnCount, () => 6);
        const result = setRow(1, newRow)(grid);

        expect(result._array2D).toEqual([
            [0, 0, 0],
            [6, 6, 6],
            [0, 0, 0],
        ]);
    });

    it("replaces a row at y = rowCount - 1", () => {
        const columnCount = 3;
        const grid = createGrid({columnCount, rowCount: 3, createCell: () => 0});
        const newRow = createArray(columnCount, () => 6);
        const result = setRow(2, newRow)(grid);

        expect(result._array2D).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [6, 6, 6],
        ]);
    });

    it("does nothing if the y is outside the grid (negative)", () => {
        const columnCount = 3;
        const grid = createGrid({columnCount, rowCount: 3, createCell: () => 0});
        const newRow = createArray(columnCount, () => 6);
        const result = setRow(-1, newRow)(grid);

        expect(result._array2D).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });

    it("does nothing if the y is outside the grid (positive)", () => {
        const columnCount = 3;
        const grid = createGrid({columnCount, rowCount: 3, createCell: () => 0});
        const newRow = createArray(columnCount, () => 6);
        const result = setRow(4, newRow)(grid);

        expect(result._array2D).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });

    it("injects smaller rows", () => {
        const grid = createGrid({columnCount: 3, rowCount: 3, createCell: () => 0});
        const newRowWith2Cells = createArray(2, () => 6);
        const result = setRow(0, newRowWith2Cells)(grid);

        expect(result._array2D).toEqual([
            [6, 6, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });

    it("ignores outside values of bigger rows", () => {
        const grid = createGrid({columnCount: 3, rowCount: 3, createCell: () => 0});
        const newRowWith5Cells = createArray(5, () => 6);
        const result = setRow(1, newRowWith5Cells)(grid);

        expect(result._array2D).toEqual([
            [0, 0, 0],
            [6, 6, 6],
            [0, 0, 0],
        ]);
    });

    describe("offset", () => {
        it("injects smaller rows with xOffset", () => {
            const grid = createGrid({columnCount: 3, rowCount: 3, createCell: () => 0});
            const xOffset = 1;
            const newRowWith2Cells = createArray(2, () => 6);
            const result = setRow(0, newRowWith2Cells, xOffset)(grid);

            expect(result._array2D).toEqual([
                [0, 6, 6],
                [0, 0, 0],
                [0, 0, 0],
            ]);
        });

        it("injects bigger rows with offset", () => {
            const grid = createGrid({columnCount: 3, rowCount: 3, createCell: () => 0});
            const newRowWith5Cells = createArray(5, () => 6);
            const xOffset = 2;
            const result = setRow(1, newRowWith5Cells, xOffset)(grid);

            expect(result._array2D).toEqual([
                [0, 0, 0],
                [0, 0, 6],
                [0, 0, 0],
            ]);
        });

        it("injects equal rows with offset", () => {
            const columnCount = 3;
            const grid = createGrid({columnCount, rowCount: 3, createCell: () => 0});
            const newRowWith5Cells = createArray(columnCount, () => 6);
            const xOffset = 1;
            const result = setRow(1, newRowWith5Cells, xOffset)(grid);

            expect(result._array2D).toEqual([
                [0, 0, 0],
                [0, 6, 6],
                [0, 0, 0],
            ]);
        });

        it("injects equal rows with negative offset", () => {
            const columnCount = 3;
            const grid = createGrid({columnCount, rowCount: 3, createCell: () => 0});
            const newRowWith5Cells = createArray(columnCount, () => 6);
            const xOffset = -1;
            const result = setRow(1, newRowWith5Cells, xOffset)(grid);

            expect(result._array2D).toEqual([
                [0, 0, 0],
                [6, 6, 0],
                [0, 0, 0],
            ]);
        });
    });
});
