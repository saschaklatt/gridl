import {createStore} from "redux";
import {createGrid, createGridFromArray2D} from "../../src";
import {selectCell} from "../../src/core/selectors";
import {transform, removeRow} from "../../src/transformers";

describe("grid", () => {
    describe("as immutable grid", () => {
        describe("factories", () => {
            describe("createGrid", () => {
                it("creates a 4x3 grid", () => {
                    const columnCount = 4;
                    const rowCount = 3;
                    const grid = createGrid({columnCount, rowCount, createCell: (_pos, idx) => idx});
                    expect(grid).toEqual({
                        x: 0,
                        y: 0,
                        cellCount: columnCount * rowCount,
                        columnCount: columnCount,
                        rowCount: rowCount,
                        array2D: [
                            [0, 1, 2, 3],
                            [4, 5, 6, 7],
                            [8, 9, 10, 11],
                        ],
                    });
                });

                it("creates a 4x3 grid with position", () => {
                    const columnCount = 4;
                    const rowCount = 3;
                    const x = 1;
                    const y = 2;
                    const grid = createGrid({columnCount, rowCount, x, y, createCell: (_pos, idx) => idx});
                    expect(grid).toEqual({
                        x,
                        y,
                        cellCount: columnCount * rowCount,
                        columnCount,
                        rowCount,
                        array2D: [
                            [0, 1, 2, 3],
                            [4, 5, 6, 7],
                            [8, 9, 10, 11],
                        ],
                    });
                });

                it("creates an empty grid", () => {
                    const grid = createGrid({columnCount: 0, rowCount: 0, createCell: () => null});
                    expect(grid).toEqual({
                        x: 0,
                        y: 0,
                        cellCount: 0,
                        columnCount: 0,
                        rowCount: 0,
                        array2D: [],
                    });
                });
            });

            describe("createGridFromArray2D", () => {
                it("creates a grid from array2D", () => {
                    const array2D = [
                        [0, 1, 2, 3],
                        [4, 5, 6, 7],
                        [8, 9, 10, 11],
                    ];
                    const grid = createGridFromArray2D(array2D);
                    expect(grid).toEqual({
                        x: 0,
                        y: 0,
                        cellCount: 12,
                        columnCount: 4,
                        rowCount: 3,
                        array2D: array2D,
                    });
                    expect(grid.array2D).not.toBe(array2D);
                });

                it("creates a grid from array2D with position values", () => {
                    const array2D = [
                        [0, 1, 2, 3],
                        [4, 5, 6, 7],
                        [8, 9, 10, 11],
                    ];
                    const x = 1;
                    const y = 2;
                    const grid = createGridFromArray2D({array2D, x, y});
                    expect(grid).toEqual({
                        x,
                        y,
                        cellCount: 12,
                        columnCount: 4,
                        rowCount: 3,
                        array2D: array2D,
                    });
                    expect(grid.array2D).not.toBe(array2D);
                });

                it("works with one empty row", () => {
                    const array2D = [
                        [],
                    ];
                    const grid = createGridFromArray2D(array2D);
                    expect(grid).toEqual({
                        x: 0,
                        y: 0,
                        cellCount: 0,
                        columnCount: 0,
                        rowCount: 0,
                        array2D: [],
                    });
                });

                it("works with an empty array", () => {
                    const array2D = [] as any[];
                    const grid = createGridFromArray2D(array2D);
                    expect(grid).toEqual({
                        x: 0,
                        y: 0,
                        cellCount: 0,
                        columnCount: 0,
                        rowCount: 0,
                        array2D: [],
                    });
                });
            });
        });

        describe("accessors", () => {
            it("provides immutable properties", () => {
                const grid: any = createGrid({columnCount: 3, rowCount: 4, createCell: (_pos, idx) => idx});

                expect(grid).toEqual({
                    x: 0,
                    y: 0,
                    cellCount: 12,
                    columnCount: 3,
                    rowCount: 4,
                    array2D: [
                        [0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                        [9, 10, 11],
                    ],
                });

                expect(() => grid.cellCount = 12).toThrow();
                expect(() => grid.columnCount = 12).toThrow();
                expect(() => grid.rowCount = 12).toThrow();
                expect(() => grid.array2D = [[0,1,2], [2,3,4]]).toThrow();
                expect(() => grid.array2D[0] = [0,1,2]).toThrow();
                expect(() => grid.array2D[0][0] = 12).toThrow();
            });

            it("treats [[]] as []", () => {
                const grid = createGridFromArray2D([[]]);

                expect(grid.columnCount).toBe(0);
                expect(grid.rowCount).toBe(0);
                expect(grid.array2D).toEqual([]);
                expect(grid.array2D).not.toEqual([[]]);
            });
        });

        describe("destructuring", () => {
            it("can be destructured", () => {
                const columnCount = 3;
                const rowCount = 2;
                const grid = createGrid({columnCount, rowCount, createCell: (_pos, idx) => idx});

                const result = {...grid};
                expect(result).toEqual({
                    x: 0,
                    y: 0,
                    rowCount: rowCount,
                    columnCount: columnCount,
                    cellCount: rowCount * columnCount,
                    array2D: [
                        [0, 1, 2],
                        [3, 4, 5],
                    ],
                });

                expect(result).toEqual({
                    x: 0,
                    y: 0,
                    rowCount: rowCount,
                    columnCount: columnCount,
                    cellCount: rowCount * columnCount,
                    array2D: [
                        [0, 1, 2],
                        [3, 4, 5],
                    ],
                });
            });
        });

        describe("redux", () => {
            it("works with redux", () => {
                const initialState = {
                    grid: createGrid({columnCount: 3, rowCount: 3, createCell: (_pos, idx) => idx}),
                };
                const reducer = (state: any = initialState, action: any) => {
                    return action.type === "removeRow"
                        ? {
                            ...state,
                            grid: transform(removeRow(action.payload.y))(state.grid),
                        }
                        : state;
                };
                const store = createStore(reducer);

                expect(store.getState().grid).toEqual({
                    x: 0,
                    y: 0,
                    rowCount: 3,
                    columnCount: 3,
                    cellCount: 9,
                    array2D: [
                        [0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                    ],
                });
                expect(selectCell({x: 1, y: 1, grid: store.getState().grid})).toBe(4);

                store.dispatch({type: "removeRow", payload: {y: 1}});

                expect(store.getState().grid).toEqual({
                    x: 0,
                    y: 0,
                    rowCount: 2,
                    columnCount: 3,
                    cellCount: 6,
                    array2D: [
                        [0, 1, 2],
                        [6, 7, 8],
                    ],
                });
                expect(selectCell({x: 1, y: 1, grid: store.getState().grid})).toBe(7);
            });
        });
    });
});
