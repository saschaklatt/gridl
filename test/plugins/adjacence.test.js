import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl, { adjacences, directions } from '../../src';

describe('adjacence', () => {

    describe('adjacentCellsAt', () => {

        const mockData = () => ([
            [ 1, 2, 3, 4, 5],
            [ 6, 7, 8, 9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
            [21,22,23,24,25],
        ]);

        describe('without values that are outside the grid', () => {

            describe('with adjacences.ALL (default)', () => {

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2])).to.deep.equal([7, 8, 9, 12, 14, 17, 18, 19]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2])).to.deep.equal([6, 7, 12, 16, 17]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2])).to.deep.equal([6, 11, 16]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2])).to.deep.equal([]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2])).to.deep.equal([9, 10, 14, 19, 20]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2])).to.deep.equal([10, 15, 20]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2])).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0])).to.deep.equal([2, 4, 7, 8, 9]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1])).to.deep.equal([2, 3, 4]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2])).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4])).to.deep.equal([17, 18, 19, 22, 24]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5])).to.deep.equal([22, 23, 24]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6])).to.deep.equal([]);
                });

            });

            describe('with adjacences.ORTHOGONAL', () => {

                const adjacence = adjacences.ORTHOGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2], adjacence)).to.deep.equal([8, 12, 14, 18]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2], adjacence)).to.deep.equal([6, 12, 16]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2], adjacence)).to.deep.equal([11]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2], adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2], adjacence)).to.deep.equal([10, 14, 20]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2], adjacence)).to.deep.equal([15]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2], adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0], adjacence)).to.deep.equal([2, 4, 8]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1], adjacence)).to.deep.equal([3]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2], adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4], adjacence)).to.deep.equal([18, 22, 24]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5], adjacence)).to.deep.equal([23]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6], adjacence)).to.deep.equal([]);
                });

            });

            describe('with adjacences.DIAGONAL', () => {

                const adjacence = adjacences.DIAGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2], adjacence)).to.deep.equal([7,9,17,19]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2], adjacence)).to.deep.equal([7, 17]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2], adjacence)).to.deep.equal([6, 16]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2], adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2], adjacence)).to.deep.equal([9,19]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2], adjacence)).to.deep.equal([10, 20]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2], adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0], adjacence)).to.deep.equal([7,9]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1], adjacence)).to.deep.equal([2,4]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2], adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4], adjacence)).to.deep.equal([17,19]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5], adjacence)).to.deep.equal([22,24]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6], adjacence)).to.deep.equal([]);
                });

            });

            describe('with custom adjacences', () => {

                const orthogonalClockwise = [
                    directions.UP,
                    directions.RIGHT,
                    directions.DOWN,
                    directions.LEFT,
                ];

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2], orthogonalClockwise)).to.deep.equal([8,14,18,12]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2], orthogonalClockwise)).to.deep.equal([6, 12, 16]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2], orthogonalClockwise)).to.deep.equal([11]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2], orthogonalClockwise)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2], orthogonalClockwise)).to.deep.equal([10, 20, 14]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2], orthogonalClockwise)).to.deep.equal([15]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2], orthogonalClockwise)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0], orthogonalClockwise)).to.deep.equal([4,8,2]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1], orthogonalClockwise)).to.deep.equal([3]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2], orthogonalClockwise)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4], orthogonalClockwise)).to.deep.equal([18, 24, 22]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5], orthogonalClockwise)).to.deep.equal([23]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6], orthogonalClockwise)).to.deep.equal([]);
                });

            });

        });

        describe('including values that are outside the grid', () => {

            describe('with adjacences.ALL (default)', () => {

                const adjacence = adjacences.ALL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2], adjacence, true)).to.deep.equal([
                        7, 8, 9,
                        12, 14,
                        17, 18, 19,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2], adjacence, true)).to.deep.equal([
                        undefined, 6, 7,
                        undefined, 12,
                        undefined, 16, 17,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, 6,
                        undefined, 11,
                        undefined, undefined, 16,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2], adjacence, true)).to.deep.equal([
                        9, 10, undefined,
                        14, undefined,
                        19, 20, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2], adjacence, true)).to.deep.equal([
                        10, undefined, undefined,
                        15, undefined,
                        20, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        2, 4,
                        7, 8, 9,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        2, 3, 4
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4], adjacence, true)).to.deep.equal([
                        17, 18, 19,
                        22, 24,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5], adjacence, true)).to.deep.equal([
                        22, 23, 24,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

            });

            describe('with adjacences.ORTHOGONAL', () => {

                const adjacence = adjacences.ORTHOGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2], adjacence, true)).to.deep.equal([8, 12, 14, 18]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2], adjacence, true)).to.deep.equal([
                        6, undefined, 12, 16
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, 11, undefined,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2], adjacence, true)).to.deep.equal([
                        10, 14, undefined, 20,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2], adjacence, true)).to.deep.equal([
                        undefined, 15, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0], adjacence, true)).to.deep.equal([
                        undefined, 2, 4, 8,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1], adjacence, true)).to.deep.equal([
                        undefined,  undefined,  undefined, 3,
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4], adjacence, true)).to.deep.equal([
                        18, 22, 24, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5], adjacence, true)).to.deep.equal([
                        23,  undefined, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

            });

            describe('with adjacences.DIAGONAL', () => {

                const adjacence = adjacences.DIAGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2], adjacence, true)).to.deep.equal([7,9,17,19]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2], adjacence, true)).to.deep.equal([
                        undefined, 7, undefined, 17,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2], adjacence, true)).to.deep.equal([
                        undefined, 6, undefined, 16,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2], adjacence, true)).to.deep.equal([
                        9, undefined, 19, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2], adjacence, true)).to.deep.equal([
                        10, undefined, 20, undefined,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0], adjacence, true)).to.deep.equal([
                        undefined, undefined, 7, 9,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1], adjacence, true)).to.deep.equal([
                        undefined, undefined, 2, 4,
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4], adjacence, true)).to.deep.equal([
                        17, 19, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5], adjacence, true)).to.deep.equal([
                        22, 24, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6], adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

            });

            describe('with custom adjacences', () => {

                const orthogonalClockwise = [
                    directions.UP,
                    directions.RIGHT,
                    directions.DOWN,
                    directions.LEFT,
                ];

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,2], orthogonalClockwise, true)).to.deep.equal([
                        8,14,18,12,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([0,2], orthogonalClockwise, true)).to.deep.equal([
                        6, 12, 16, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-1,2], orthogonalClockwise, true)).to.deep.equal([
                        undefined, 11, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([-2,2], orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([4,2], orthogonalClockwise, true)).to.deep.equal([
                        10, undefined, 20, 14,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([5,2], orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, 15,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([6,2], orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,0], orthogonalClockwise, true)).to.deep.equal([
                        undefined, 4, 8, 2,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-1], orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, 3,  undefined,
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,-2], orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,4], orthogonalClockwise, true)).to.deep.equal([
                        18, 24, undefined, 22,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,5], orthogonalClockwise, true)).to.deep.equal([
                        23, undefined, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).adjacentCellsAt([2,6], orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

            });

        });

    });

    describe('adjacentCells', () => {

        const mockData = () => ([
            [ 1, 2, 3, 4, 5],
            [ 6, 7, 8, 9,10],
            [11,12,13,14,15],
            [16,17,18,19,20],
            [21,22,23,24,25],
        ]);

        describe('without values that are outside the grid', () => {

            describe('with adjacences.ALL (default)', () => {

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).goto([2,2]).adjacentCells()).to.deep.equal([7, 8, 9, 12, 14, 17, 18, 19]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).goto([0,2]).adjacentCells()).to.deep.equal([6, 7, 12, 16, 17]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).goto([-1,2]).adjacentCells()).to.deep.equal([6, 11, 16]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).goto([-2,2]).adjacentCells()).to.deep.equal([]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).goto([4,2]).adjacentCells()).to.deep.equal([9, 10, 14, 19, 20]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).goto([5,2]).adjacentCells()).to.deep.equal([10, 15, 20]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).goto([6,2]).adjacentCells()).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).goto([2,0]).adjacentCells()).to.deep.equal([2, 4, 7, 8, 9]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).goto([2,-1]).adjacentCells()).to.deep.equal([2, 3, 4]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).goto([2,-2]).adjacentCells()).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).goto([2,4]).adjacentCells()).to.deep.equal([17, 18, 19, 22, 24]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).goto([2,5]).adjacentCells()).to.deep.equal([22, 23, 24]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).goto([2,6]).adjacentCells()).to.deep.equal([]);
                });

            });

            describe('with adjacences.ORTHOGONAL', () => {

                const adjacence = adjacences.ORTHOGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).goto([2,2]).adjacentCells(adjacence)).to.deep.equal([8, 12, 14, 18]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).goto([0,2]).adjacentCells(adjacence)).to.deep.equal([6, 12, 16]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).goto([-1,2]).adjacentCells(adjacence)).to.deep.equal([11]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).goto([-2,2]).adjacentCells(adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).goto([4,2]).adjacentCells(adjacence)).to.deep.equal([10, 14, 20]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).goto([5,2]).adjacentCells(adjacence)).to.deep.equal([15]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).goto([6,2]).adjacentCells(adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).goto([2,0]).adjacentCells(adjacence)).to.deep.equal([2, 4, 8]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).goto([2,-1]).adjacentCells(adjacence)).to.deep.equal([3]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).goto([2,-2]).adjacentCells(adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).goto([2,4]).adjacentCells(adjacence)).to.deep.equal([18, 22, 24]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).goto([2,5]).adjacentCells(adjacence)).to.deep.equal([23]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).goto([2,6]).adjacentCells(adjacence)).to.deep.equal([]);
                });

            });

            describe('with adjacences.DIAGONAL', () => {

                const adjacence = adjacences.DIAGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).goto([2,2]).adjacentCells(adjacence)).to.deep.equal([7,9,17,19]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).goto([0,2]).adjacentCells(adjacence)).to.deep.equal([7, 17]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).goto([-1,2]).adjacentCells(adjacence)).to.deep.equal([6, 16]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).goto([-2,2]).adjacentCells(adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).goto([4,2]).adjacentCells(adjacence)).to.deep.equal([9,19]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).goto([5,2]).adjacentCells(adjacence)).to.deep.equal([10, 20]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).goto([6,2]).adjacentCells(adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).goto([2,0]).adjacentCells(adjacence)).to.deep.equal([7,9]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).goto([2,-1]).adjacentCells(adjacence)).to.deep.equal([2,4]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).goto([2,-2]).adjacentCells(adjacence)).to.deep.equal([]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).goto([2,4]).adjacentCells(adjacence)).to.deep.equal([17,19]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).goto([2,5]).adjacentCells(adjacence)).to.deep.equal([22,24]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).goto([2,6]).adjacentCells(adjacence)).to.deep.equal([]);
                });

            });

        });

        describe('including values that are outside the grid', () => {

            describe('with adjacences.ALL (default)', () => {

                const adjacence = adjacences.ALL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).goto([2,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        7, 8, 9,
                        12, 14,
                        17, 18, 19,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).goto([0,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, 6, 7,
                        undefined, 12,
                        undefined, 16, 17,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).goto([-1,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, 6,
                        undefined, 11,
                        undefined, undefined, 16,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).goto([-2,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).goto([4,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        9, 10, undefined,
                        14, undefined,
                        19, 20, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).goto([5,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        10, undefined, undefined,
                        15, undefined,
                        20, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).goto([6,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).goto([2,0]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        2, 4,
                        7, 8, 9,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).goto([2,-1]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        2, 3, 4
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).goto([2,-2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).goto([2,4]).adjacentCells(adjacence, true)).to.deep.equal([
                        17, 18, 19,
                        22, 24,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).goto([2,5]).adjacentCells(adjacence, true)).to.deep.equal([
                        22, 23, 24,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).goto([2,6]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined,
                        undefined, undefined,
                        undefined, undefined, undefined,
                    ]);
                });

            });

            describe('with adjacences.ORTHOGONAL', () => {

                const adjacence = adjacences.ORTHOGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).goto([2,2]).adjacentCells(adjacence, true)).to.deep.equal([8, 12, 14, 18]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).goto([0,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        6, undefined, 12, 16
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).goto([-1,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, 11, undefined,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).goto([-2,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).goto([4,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        10, 14, undefined, 20,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).goto([5,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, 15, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).goto([6,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).goto([2,0]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, 2, 4, 8,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).goto([2,-1]).adjacentCells( adjacence, true)).to.deep.equal([
                        undefined,  undefined,  undefined, 3,
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).goto([2,-2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).goto([2,4]).adjacentCells(adjacence, true)).to.deep.equal([
                        18, 22, 24, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).goto([2,5]).adjacentCells(adjacence, true)).to.deep.equal([
                        23,  undefined, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).goto([2,6]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

            });

            describe('with adjacences.DIAGONAL', () => {

                const adjacence = adjacences.DIAGONAL;

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).goto([2,2]).adjacentCells(adjacence, true)).to.deep.equal([7,9,17,19]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).goto([0,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, 7, undefined, 17,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).goto([-1,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, 6, undefined, 16,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).goto([-2,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).goto([4,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        9, undefined, 19, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).goto([5,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        10, undefined, 20, undefined,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).goto([6,2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).goto([2,0]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, 7, 9,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).goto([2,-1]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, 2, 4,
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).goto([2,-2]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).goto([2,4]).adjacentCells(adjacence, true)).to.deep.equal([
                        17, 19, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).goto([2,5]).adjacentCells(adjacence, true)).to.deep.equal([
                        22, 24, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).goto([2,6]).adjacentCells(adjacence, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

            });

            describe('with custom adjacences', () => {

                const orthogonalClockwise = [
                    directions.UP,
                    directions.RIGHT,
                    directions.DOWN,
                    directions.LEFT,
                ];

                it('should get me all adjacent cells', () => {
                    expect(gridl(mockData()).goto([2,2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        8,14,18,12,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge', () => {
                    expect(gridl(mockData()).goto([0,2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        6, 12, 16, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = left edge - 1', () => {
                    expect(gridl(mockData()).goto([-1,2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, 11, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if x = left edge - 2', () => {
                    expect(gridl(mockData()).goto([-2,2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge', () => {
                    expect(gridl(mockData()).goto([4,2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        10, undefined, 20, 14,
                    ]);
                });

                it('should get me all adjacent cells if x = right edge + 1', () => {
                    expect(gridl(mockData()).goto([5,2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, 15,
                    ]);
                });

                it('should get me an empty list if x = right edge + 2', () => {
                    expect(gridl(mockData()).goto([6,2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge', () => {
                    expect(gridl(mockData()).goto([2,0]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, 4, 8, 2,
                    ]);
                });

                it('should get me all adjacent cells if y = top edge - 1', () => {
                    expect(gridl(mockData()).goto([2,-1]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, 3,  undefined,
                    ]);
                });

                it('should get me an empty list if y = top edge - 2', () => {
                    expect(gridl(mockData()).goto([2,-2]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge', () => {
                    expect(gridl(mockData()).goto([2,4]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        18, 24, undefined, 22,
                    ]);
                });

                it('should get me all adjacent cells if y = bottom edge + 1', () => {
                    expect(gridl(mockData()).goto([2,5]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        23, undefined, undefined, undefined,
                    ]);
                });

                it('should get me an empty list if y = bottom edge + 2', () => {
                    expect(gridl(mockData()).goto([2,6]).adjacentCells(orthogonalClockwise, true)).to.deep.equal([
                        undefined, undefined, undefined, undefined,
                    ]);
                });

            });

        });

    });

});