import {createGrid, createGridFromArray2D, North, NorthEast, NorthWest} from "../../src";
import {selectCell, selectColumn, selectNeighbours, selectRow, selectSubGrid} from "../../src/core/selectors";

describe("selectors", () => {
    describe("selectCell()", () => {
        it("returns the cell values", () => {
            const columnCount = 3;
            const rowCount = 4;
            const grid = createGrid({columnCount, rowCount, createCell: (_pos, idx) => idx});
            expect(selectCell({grid, x: 0, y: 0})).toBe(0);
            expect(selectCell({grid, x: 1, y: 0})).toBe(1);
            expect(selectCell({grid, x: 2, y: 0})).toBe(2);
            expect(selectCell({grid, x: 0, y: 1})).toBe(3);
            expect(selectCell({grid, x: -1, y: 0})).toBe(undefined);
            expect(selectCell({grid, x: 0, y: -1})).toBe(undefined);
            expect(selectCell({grid, x: columnCount, y: 0})).toBe(undefined);
            expect(selectCell({grid, x: 0, y: rowCount})).toBe(undefined);
        });
    });

    describe("selectRow()", () => {
        it("returns the rows", () => {
            const grid = createGrid({columnCount: 4, rowCount: 3, createCell: (_pos, idx) => idx});
            expect(selectRow({grid, y: 0})).toEqual([0, 1, 2, 3]);
            expect(selectRow({grid, y: 1})).toEqual([4, 5, 6, 7]);
            expect(selectRow({grid, y: 2})).toEqual([8, 9, 10, 11]);
            expect(selectRow({grid, y: -1})).toBe(undefined);
            expect(selectRow({grid, y: 3})).toBe(undefined);
        });
    });

    describe("getColumn()", () => {
        it("returns the columns", () => {
            const grid = createGrid({columnCount: 4, rowCount: 3, createCell: (_pos, idx) => idx});
            expect(selectColumn({grid, x: 0})).toEqual([0, 4, 8]);
            expect(selectColumn({grid, x: 1})).toEqual([1, 5, 9]);
            expect(selectColumn({grid, x: 2})).toEqual([2, 6, 10]);
            expect(selectColumn({grid, x: 3})).toEqual([3, 7, 11]);
            expect(selectColumn({grid, x: -1})).toBe(undefined);
            expect(selectColumn({grid, x: 4})).toBe(undefined);
        });
    });

    describe("getSubGrid()", () => {
        it("selects an area", () => {
            const grid = createGrid({columnCount: 10, rowCount: 10, createCell: (_pos, idx) => idx});

            const area = {x: 2, y: 4, columnCount: 5, rowCount: 3};
            const result = selectSubGrid({grid, area});
            expect(result).toEqual({
                x: 2,
                y: 4,
                cellCount : 15,
                rowCount: 3,
                columnCount: 5,
                array2D: [
                    [42, 43, 44, 45, 46],
                    [52, 53, 54, 55, 56],
                    [62, 63, 64, 65, 66],
                ],
            });
        });

        it("ignores positive outside values", () => {
            const grid = createGrid({columnCount: 10, rowCount: 10, createCell: (_pos, idx) => idx});
            const area = {x: 8, y: 8, columnCount: 5, rowCount: 5};
            const result = selectSubGrid({grid, area});
            expect(result).toEqual({
                cellCount: 4,
                columnCount: 2,
                rowCount: 2,
                x: 8,
                y: 8,
                array2D: [
                    [88, 89],
                    [98, 99],
                ],
            });
        });

        it("ignores negative outside values", () => {
            const grid = createGrid({columnCount: 10, rowCount: 10, createCell: (_pos, idx) => idx});
            const area = {x: -2, y: -2, columnCount: 4, rowCount: 4};
            const result = selectSubGrid({grid, area});
            expect(result).toEqual({
                rowCount: 2,
                columnCount: 2,
                cellCount: 4,
                x: 0,
                y: 0,
                array2D: [
                    [0, 1],
                    [10, 11],
                ],
            });
        });
    });

    describe("getNeighbours", () => {
        const mockGrid = () => createGridFromArray2D([
            [ 1, 2, 3, 4, 5],
            [ 6, 7, 8, 9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
            [21,22,23,24,25],
        ]);

        it("returns all neighbour cells", () => {
            const grid = mockGrid();
            const result = selectNeighbours({grid, origin: {x: 2, y: 1}});
            expect(result).toEqual([
                {cell: 3,  position: {x: 2, y: 0}},
                {cell: 4,  position: {x: 3, y: 0}},
                {cell: 9,  position: {x: 3, y: 1}},
                {cell: 14, position: {x: 3, y: 2}},
                {cell: 13, position: {x: 2, y: 2}},
                {cell: 12, position: {x: 1, y: 2}},
                {cell: 7,  position: {x: 1, y: 1}},
                {cell: 2,  position: {x: 1, y: 0}},
            ]);
        });

        it("returns all neighbour cells with custom directions", () => {
            const topNeighbourPositions = [NorthWest, North, NorthEast];
            const grid = mockGrid();
            const result =  selectNeighbours({grid, origin: {x: 2, y:1}, positions: topNeighbourPositions});
            expect(result).toEqual([
                {cell: 2,  position: {x: 1, y: 0}},
                {cell: 3,  position: {x: 2, y: 0}},
                {cell: 4,  position: {x: 3, y: 0}},
            ]);
        });

        it("includes negative positions outside the shape", () => {
            const grid = mockGrid();
            const origin = {x: 0, y: 0};
            const resultWithDefaults = selectNeighbours({grid, origin});
            const resultWithoutDefaults = selectNeighbours({grid, origin, skipOutsiders: false});

            const expectedResult = [
                {cell: undefined, position: {x: 0, y: -1}},
                {cell: undefined, position: {x: 1, y: -1}},
                {cell: 2, position: {x: 1, y: 0}},
                {cell: 7, position: {x: 1, y: 1}},
                {cell: 6, position: {x: 0, y: 1}},
                {cell: undefined, position: {x: -1, y: 1}},
                {cell: undefined, position: {x: -1, y: 0}},
                {cell: undefined, position: {x: -1, y: -1}},
            ];
            expect(resultWithDefaults).toEqual(expectedResult);
            expect(resultWithoutDefaults).toEqual(expectedResult);
        });

        it("includes positive positions outside the shape", () => {
            const grid = mockGrid();
            const origin = {x: 4, y: 4};
            const resultWithDefaults = selectNeighbours({grid, origin});
            const resultWithoutDefaults = selectNeighbours({grid, origin, skipOutsiders: false});

            const expectedResult = [
                {cell: 20, position: {x: 4, y: 3}},
                {cell: undefined, position: {x: 5, y: 3}},
                {cell: undefined, position: {x: 5, y: 4}},
                {cell: undefined, position: {x: 5, y: 5}},
                {cell: undefined, position: {x: 4, y: 5}},
                {cell: undefined, position: {x: 3, y: 5}},
                {cell: 24, position: {x: 3, y: 4}},
                {cell: 19, position: {x: 3, y: 3}},
            ];
            expect(resultWithDefaults).toEqual(expectedResult);
            expect(resultWithoutDefaults).toEqual(expectedResult);
        });

        it("skips negative positions outside the shape", () => {
            const result = selectNeighbours({grid: mockGrid(), origin: {x: 0, y: 0}, skipOutsiders: true});
            expect(result).toEqual([
                {cell: 2, position: {x: 1, y: 0}},
                {cell: 7, position: {x: 1, y: 1}},
                {cell: 6, position: {x: 0, y: 1}},
            ]);
        });

        it("skips positive positions outside the shape", () => {
            const result = selectNeighbours({grid: mockGrid(), origin: {x: 4, y: 4}, skipOutsiders: true});
            expect(result).toEqual([
                {cell: 20, position: {x: 4, y: 3}},
                {cell: 24, position: {x: 3, y: 4}},
                {cell: 19, position: {x: 3, y: 3}},
            ]);
        });
    });
});
