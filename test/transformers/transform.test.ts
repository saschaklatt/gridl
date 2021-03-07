import {createGrid, createGridFromArray2D, map, rotate90} from "../../src";
import {selectCell} from "../../src/core/selectors";
import {removeRow} from "../../src/transformers/removeRow";
import {setCell} from "../../src/transformers/setCell";
import {transform} from "../../src/transformers/transform";

describe("transform", () => {
    it("applies mutliple transformers (docs example)", () => {
        const oldGrid = createGridFromArray2D([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);
        const newGrid = transform(
            map((_cell, pos) => pos.x < 2 ? 1 : 2),
            setCell({x: 2, y: 1}, 666),
            rotate90(1),
            removeRow(1),
        )(oldGrid);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 9,
            columnCount: 3,
            rowCount: 3,
            array2D: [
                [1, 1, 1],
                [2, 666, 2],
                [2, 2, 2],
            ],
        });
    });

    it("returns the same grid without transformer functions", () => {
        const oldGrid = createGrid({columnCount: 10, rowCount: 10, createCell: () => 0});
        const newGrid = transform()(oldGrid);
        expect(oldGrid).toBe(newGrid);
    });

    it("applies one transformer function", () => {
        const x = 0;
        const y = 0;
        const newValue = 666;
        const oldGrid = createGrid({columnCount: 10, rowCount: 10, createCell: () => 0});
        const newGrid = transform(setCell({x, y}, newValue))(oldGrid);
        expect(oldGrid.array2D[y][x]).toBe(0);
        expect(newGrid.array2D[y][x]).toBe(newValue);
    });

    it("applies mutliple transformer functions", () => {
        const oldGrid = createGrid({columnCount: 10, rowCount: 10, createCell: () => 0});
        const newGrid = transform(
            setCell({x: 5, y: 4}, 666),
            removeRow<number>(1),
        )(oldGrid);

        expect(oldGrid.array2D[3][5]).toBe(0);
        expect(oldGrid.columnCount).toBe(10);
        expect(oldGrid.rowCount).toBe(10);

        expect(newGrid.array2D[3][5]).toBe(666);
        expect(newGrid.columnCount).toBe(10);
        expect(newGrid.rowCount).toBe(9);
    });

    it("applies mutliple transformer functions", () => {
        const oldGrid = createGrid({columnCount: 10, rowCount: 10, createCell: () => 0});
        const newGrid = transform(
            setCell({x: 5, y: 4}, 666),
            removeRow<number>(1),
        )(oldGrid);

        expect(oldGrid.array2D[3][5]).toBe(0);
        expect(oldGrid.columnCount).toBe(10);
        expect(oldGrid.rowCount).toBe(10);

        expect(newGrid.array2D[3][5]).toBe(666);
        expect(newGrid.columnCount).toBe(10);
        expect(newGrid.rowCount).toBe(9);
    });

    it("can be applied mutltiple times", () => {
        const grid0 = createGrid({columnCount: 10, rowCount: 10, createCell: () => 0});
        const grid1 = transform(setCell({x: 5, y: 4}, 666))(grid0);
        const grid2 = transform(removeRow<number>(1))(grid1);

        expect(selectCell({grid: grid0, x: 5, y: 4})).toBe(0);
        expect(grid0.columnCount).toBe(10);
        expect(grid0.rowCount).toBe(10);

        expect(selectCell({grid: grid1, x: 5, y: 4})).toBe(666);
        expect(grid1.columnCount).toBe(10);
        expect(grid1.rowCount).toBe(10);

        expect(selectCell({grid: grid2, x: 5, y: 3})).toBe(666);
        expect(grid2.columnCount).toBe(10);
        expect(grid2.rowCount).toBe(9);
    });
});
