import {createGridFromArray2D, createWalker, walkEWNS, walkEWSN, walkNSEW, walkNSWE, walkSNEW, walkSNWE, walkWENS, walkWESN} from "../../src/core";

describe("walker", () => {
    describe("createWalker", () => {
        it("creates a walker", () => {
            const shape = {columnCount: 3, rowCount: 2, cellCount: 6};
            const walker = createWalker(shape);

            expect(walker.next()).toEqual({value: {index: 0, position: {x: 0, y: 0}}, done: false});
            expect(walker.next()).toEqual({value: {index: 1, position: {x: 1, y: 0}}, done: false});
            expect(walker.next()).toEqual({value: {index: 2, position: {x: 2, y: 0}}, done: false});
            expect(walker.next()).toEqual({value: {index: 3, position: {x: 0, y: 1}}, done: false});
            expect(walker.next()).toEqual({value: {index: 4, position: {x: 1, y: 1}}, done: false});
            expect(walker.next()).toEqual({value: {index: 5, position: {x: 2, y: 1}}, done: false});

            expect(walker.next()).toEqual({value: undefined, done: true});
        });
    });

    describe("walkEWNS", () => {
        const mockGrid = () => createGridFromArray2D([
            [ 2,  1, 0],
            [ 5,  4, 3],
            [ 8,  7, 6],
            [11, 10, 9],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkEWNS(grid,  0)).toEqual({x: 2, y: 0});
            expect(walkEWNS(grid,  1)).toEqual({x: 1, y: 0});
            expect(walkEWNS(grid,  2)).toEqual({x: 0, y: 0});
            expect(walkEWNS(grid,  3)).toEqual({x: 2, y: 1});
            expect(walkEWNS(grid,  4)).toEqual({x: 1, y: 1});
            expect(walkEWNS(grid,  5)).toEqual({x: 0, y: 1});
            expect(walkEWNS(grid,  6)).toEqual({x: 2, y: 2});
            expect(walkEWNS(grid,  7)).toEqual({x: 1, y: 2});
            expect(walkEWNS(grid,  8)).toEqual({x: 0, y: 2});
            expect(walkEWNS(grid,  9)).toEqual({x: 2, y: 3});
            expect(walkEWNS(grid, 10)).toEqual({x: 1, y: 3});
            expect(walkEWNS(grid, 11)).toEqual({x: 0, y: 3});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkEWNS(grid,  -1)).toEqual({x: 3, y: -1});
            expect(walkEWNS(grid,  -2)).toEqual({x: 4, y: -1});
            expect(walkEWNS(grid,  -3)).toEqual({x: 2, y: -1});
            expect(walkEWNS(grid,  -4)).toEqual({x: 3, y: -2});
            expect(walkEWNS(grid,  -5)).toEqual({x: 4, y: -2});
            expect(walkEWNS(grid,  -6)).toEqual({x: 2, y: -2});
            expect(walkEWNS(grid,  -7)).toEqual({x: 3, y: -3});
            expect(walkEWNS(grid,  -8)).toEqual({x: 4, y: -3});
            expect(walkEWNS(grid,  -9)).toEqual({x: 2, y: -3});
            expect(walkEWNS(grid, -10)).toEqual({x: 3, y: -4});
            expect(walkEWNS(grid, -11)).toEqual({x: 4, y: -4});
            expect(walkEWNS(grid, -12)).toEqual({x: 2, y: -4});
            expect(walkEWNS(grid, -13)).toEqual({x: 3, y: -5});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkEWNS(grid, 12)).toEqual({x: 2, y: 4});
            expect(walkEWNS(grid, 13)).toEqual({x: 1, y: 4});
            expect(walkEWNS(grid, 14)).toEqual({x: 0, y: 4});
            expect(walkEWNS(grid, 15)).toEqual({x: 2, y: 5});
        });
    });

    describe("walkEWSN", () => {
        const mockGrid = () => createGridFromArray2D([
            [11, 10, 9],
            [ 8,  7, 6],
            [ 5,  4, 3],
            [ 2,  1, 0],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkEWSN(grid,  0)).toEqual({x: 2, y: 3});
            expect(walkEWSN(grid,  1)).toEqual({x: 1, y: 3});
            expect(walkEWSN(grid,  2)).toEqual({x: 0, y: 3});
            expect(walkEWSN(grid,  3)).toEqual({x: 2, y: 2});
            expect(walkEWSN(grid,  4)).toEqual({x: 1, y: 2});
            expect(walkEWSN(grid,  5)).toEqual({x: 0, y: 2});
            expect(walkEWSN(grid,  6)).toEqual({x: 2, y: 1});
            expect(walkEWSN(grid,  7)).toEqual({x: 1, y: 1});
            expect(walkEWSN(grid,  8)).toEqual({x: 0, y: 1});
            expect(walkEWSN(grid,  9)).toEqual({x: 2, y: 0});
            expect(walkEWSN(grid, 10)).toEqual({x: 1, y: 0});
            expect(walkEWSN(grid, 11)).toEqual({x: 0, y: 0});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkEWSN(grid,  -1)).toEqual({x: 0, y: 4});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkEWSN(grid, 12)).toEqual({x: -1, y: -1});
        });
    });

    describe("walkNSEW", () => {
        const mockGrid = () => createGridFromArray2D([
            [ 8, 4, 0],
            [ 9, 5, 1],
            [10, 6, 2],
            [11, 7, 3],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkNSEW(grid,  0)).toEqual({x: 2, y: 0});
            expect(walkNSEW(grid,  1)).toEqual({x: 2, y: 1});
            expect(walkNSEW(grid,  2)).toEqual({x: 2, y: 2});
            expect(walkNSEW(grid,  3)).toEqual({x: 2, y: 3});
            expect(walkNSEW(grid,  4)).toEqual({x: 1, y: 0});
            expect(walkNSEW(grid,  5)).toEqual({x: 1, y: 1});
            expect(walkNSEW(grid,  6)).toEqual({x: 1, y: 2});
            expect(walkNSEW(grid,  7)).toEqual({x: 1, y: 3});
            expect(walkNSEW(grid,  8)).toEqual({x: 0, y: 0});
            expect(walkNSEW(grid,  9)).toEqual({x: 0, y: 1});
            expect(walkNSEW(grid, 10)).toEqual({x: 0, y: 2});
            expect(walkNSEW(grid, 11)).toEqual({x: 0, y: 3});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkNSEW(grid,  -1)).toEqual({x: 3, y: -1});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkNSEW(grid, 12)).toEqual({x: -1, y: 0});
        });
    });

    describe("walkNSWE", () => {
        const mockGrid = () => createGridFromArray2D([
            [0, 4,  8],
            [1, 5,  9],
            [2, 6, 10],
            [3, 7, 11],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkNSWE(grid,  0)).toEqual({x: 0, y: 0});
            expect(walkNSWE(grid,  1)).toEqual({x: 0, y: 1});
            expect(walkNSWE(grid,  2)).toEqual({x: 0, y: 2});
            expect(walkNSWE(grid,  3)).toEqual({x: 0, y: 3});
            expect(walkNSWE(grid,  4)).toEqual({x: 1, y: 0});
            expect(walkNSWE(grid,  5)).toEqual({x: 1, y: 1});
            expect(walkNSWE(grid,  6)).toEqual({x: 1, y: 2});
            expect(walkNSWE(grid,  7)).toEqual({x: 1, y: 3});
            expect(walkNSWE(grid,  8)).toEqual({x: 2, y: 0});
            expect(walkNSWE(grid,  9)).toEqual({x: 2, y: 1});
            expect(walkNSWE(grid, 10)).toEqual({x: 2, y: 2});
            expect(walkNSWE(grid, 11)).toEqual({x: 2, y: 3});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkNSWE(grid,  -1)).toEqual({x: -1, y: -1});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkNSWE(grid, 12)).toEqual({x: 3, y: 0});
        });
    });

    describe("walkSNEW", () => {
        const mockGrid = () => createGridFromArray2D([
            [11, 7, 3],
            [10, 6, 2],
            [ 9, 5, 1],
            [ 8, 4, 0],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkSNEW(grid,  0)).toEqual({x: 2, y: 3});
            expect(walkSNEW(grid,  1)).toEqual({x: 2, y: 2});
            expect(walkSNEW(grid,  2)).toEqual({x: 2, y: 1});
            expect(walkSNEW(grid,  3)).toEqual({x: 2, y: 0});
            expect(walkSNEW(grid,  4)).toEqual({x: 1, y: 3});
            expect(walkSNEW(grid,  5)).toEqual({x: 1, y: 2});
            expect(walkSNEW(grid,  6)).toEqual({x: 1, y: 1});
            expect(walkSNEW(grid,  7)).toEqual({x: 1, y: 0});
            expect(walkSNEW(grid,  8)).toEqual({x: 0, y: 3});
            expect(walkSNEW(grid,  9)).toEqual({x: 0, y: 2});
            expect(walkSNEW(grid, 10)).toEqual({x: 0, y: 1});
            expect(walkSNEW(grid, 11)).toEqual({x: 0, y: 0});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkSNEW(grid,  -1)).toEqual({x: 3, y: 0});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkSNEW(grid, 12)).toEqual({x: -1, y: -1});
        });
    });

    describe("walkSNWE", () => {
        const mockGrid = () => createGridFromArray2D([
            [3, 7, 11],
            [2, 6, 10],
            [1, 5,  9],
            [0, 4,  8],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkSNWE(grid,  0)).toEqual({x: 0, y: 3});
            expect(walkSNWE(grid,  1)).toEqual({x: 0, y: 2});
            expect(walkSNWE(grid,  2)).toEqual({x: 0, y: 1});
            expect(walkSNWE(grid,  3)).toEqual({x: 0, y: 0});
            expect(walkSNWE(grid,  4)).toEqual({x: 1, y: 3});
            expect(walkSNWE(grid,  5)).toEqual({x: 1, y: 2});
            expect(walkSNWE(grid,  6)).toEqual({x: 1, y: 1});
            expect(walkSNWE(grid,  7)).toEqual({x: 1, y: 0});
            expect(walkSNWE(grid,  8)).toEqual({x: 2, y: 3});
            expect(walkSNWE(grid,  9)).toEqual({x: 2, y: 2});
            expect(walkSNWE(grid, 10)).toEqual({x: 2, y: 1});
            expect(walkSNWE(grid, 11)).toEqual({x: 2, y: 0});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkSNWE(grid,  -1)).toEqual({x: -1, y: 0});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkSNWE(grid, 12)).toEqual({x: 3, y: -1});
        });
    });

    describe("walkWENS", () => {
        const mockGrid = () => createGridFromArray2D([
            [0,  1,  2],
            [3,  4,  5],
            [6,  7,  8],
            [9, 10, 11],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkWENS(grid,  0)).toEqual({x: 0, y: 0});
            expect(walkWENS(grid,  1)).toEqual({x: 1, y: 0});
            expect(walkWENS(grid,  2)).toEqual({x: 2, y: 0});
            expect(walkWENS(grid,  3)).toEqual({x: 0, y: 1});
            expect(walkWENS(grid,  4)).toEqual({x: 1, y: 1});
            expect(walkWENS(grid,  5)).toEqual({x: 2, y: 1});
            expect(walkWENS(grid,  6)).toEqual({x: 0, y: 2});
            expect(walkWENS(grid,  7)).toEqual({x: 1, y: 2});
            expect(walkWENS(grid,  8)).toEqual({x: 2, y: 2});
            expect(walkWENS(grid,  9)).toEqual({x: 0, y: 3});
            expect(walkWENS(grid, 10)).toEqual({x: 1, y: 3});
            expect(walkWENS(grid, 11)).toEqual({x: 2, y: 3});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkWENS(grid,  -1)).toEqual({x: -1, y: -1});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkWENS(grid, 12)).toEqual({x: 0, y: 4});
        });
    });

    describe("walkWESN", () => {
        const mockGrid = () => createGridFromArray2D([
            [9, 10, 11],
            [6,  7,  8],
            [3,  4,  5],
            [0,  1,  2],
        ]);

        it("converts existing indexes to positions inside the grid", () => {
            const grid = mockGrid();
            expect(walkWESN(grid,  0)).toEqual({x: 0, y: 3});
            expect(walkWESN(grid,  1)).toEqual({x: 1, y: 3});
            expect(walkWESN(grid,  2)).toEqual({x: 2, y: 3});
            expect(walkWESN(grid,  3)).toEqual({x: 0, y: 2});
            expect(walkWESN(grid,  4)).toEqual({x: 1, y: 2});
            expect(walkWESN(grid,  5)).toEqual({x: 2, y: 2});
            expect(walkWESN(grid,  6)).toEqual({x: 0, y: 1});
            expect(walkWESN(grid,  7)).toEqual({x: 1, y: 1});
            expect(walkWESN(grid,  8)).toEqual({x: 2, y: 1});
            expect(walkWESN(grid,  9)).toEqual({x: 0, y: 0});
            expect(walkWESN(grid, 10)).toEqual({x: 1, y: 0});
            expect(walkWESN(grid, 11)).toEqual({x: 2, y: 0});
        });

        it("converts negative indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkWESN(grid,  -1)).toEqual({x: 2, y: 4});
        });

        it("converts to big indexes to positions outside the grid", () => {
            const grid = mockGrid();
            expect(walkWESN(grid, 12)).toEqual({x: 3, y: -1});
        });
    });
});
