import {setCell} from "../../src/transformers/setCell";
import {createGrid, createGridFromArray2D} from "../../src";
import {selectCell} from "../../src/core/selectors";

describe("setCell", () => {
    it("replaces an existing cell value", () => {
        const pos = {x: 2, y: 1};
        const newValue = "moin";
        const grid = createGridFromArray2D([
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
        ]);
        const newGrid = setCell<number | string>(pos, newValue)(grid);
        expect(selectCell({...pos, grid: newGrid})).toBe(newValue);
        expect(newGrid).toEqual({
            x: 0,
            y: 0,
            cellCount: 12,
            columnCount: 4,
            rowCount: 3,
            _array2D: [
                [0, 1, 2, 3],
                [4, 5, "moin", 7],
                [8, 9, 10, 11],
            ],
        });
    });

    it("ignores outside values", () => {
        const grid = createGrid({columnCount: 10, rowCount: 12, createCell: (_pos, idx) => idx});

        setCell({x: 100, y: 4}, 666)(grid);
        expect(grid._array2D[4][100]).toBe(undefined);

        setCell({x: 4, y: 100}, 666)(grid);
        expect(grid._array2D[100]).toBe(undefined);
    });
});
