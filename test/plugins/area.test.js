import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';

describe('areas', () => {

    describe('area', () => {

        const mockData = () => [
            [0,7,3,2,8,4,8],
            [4,2,5,7,8,4,8],
            [6,6,6,6,7,4,8],
            [6,6,6,6,7,4,8],
            [6,5,1,6,9,2,7],
        ];

        it('should an area function', () => {
            expect(typeof gridl(mockData()).area).to.equal('function');
        });

        describe('numColumns', () => {

            it('should return the default number of 0', () => {
                const data = mockData();
                const area = gridl(data).area([]);
                expect(area.numColumns()).to.deep.equal(0);
            });

            it('should return the number of columns', () => {
                const data = mockData();
                const area = gridl(data).area([1,2,4,3]);
                expect(area.numColumns()).to.deep.equal(1);
            });

        });

        describe('numRows', () => {

            it('should return the default number of 0', () => {
                const data = mockData();
                const area = gridl(data).area([1]);
                expect(area.numRows()).to.deep.equal(0);
            });

            it('should return the number of rows', () => {
                const data = mockData();
                const area = gridl(data).area([1,2,4,3]);
                expect(area.numRows()).to.deep.equal(2);
            });

        });

        describe('size', () => {

            it('should return the default number of 0', () => {
                const data = mockData();
                const area = gridl(data).area([]);
                expect(area.size()).to.deep.equal([0, 0]);
            });

            it('should return the number of rows', () => {
                const data = mockData();
                const area = gridl(data).area([1,2,4,3]);
                expect(area.size()).to.deep.equal([1, 2]);
            });

        });

        describe('position', () => {

            it('should return the default position of [0,0]', () => {
                const data = mockData();
                const area = gridl(data).area([1,2]);
                expect(area.position()).to.deep.equal([0, 0]);
            });

            it('should return the position', () => {
                const data = mockData();
                const area = gridl(data).area([0,0,4,3]);
                expect(area.position()).to.deep.equal([4, 3]);
            });

        });

        describe('anchor', () => {

            it('should return the default anchor of [0,0]', () => {
                const data = mockData();
                const area = gridl(data).area([1,2,4,3]);
                expect(area.anchor()).to.deep.equal([0, 0]);
            });

            it('should return the anchor', () => {
                const data = mockData();
                const area = gridl(data).area([0,0,4,3,1,2]);
                expect(area.anchor()).to.deep.equal([1, 2]);
            });

        });

        describe('valueAt (as getter)', () => {

            it('should get the value at a local position, with area positioned at [0,0]', () => {
                const data = mockData();
                const grid = gridl(data);
                const result = grid.area([4,3]).valueAt([2,1]);
                expect(result).to.equal(5);
            });

        });

        describe('valueAt (as setter)', () => {

            it('should get the value at a local position, with area positioned at [0,0]', () => {
                const data = mockData();
                const grid = gridl(data);
                const localPos = [2,1];
                grid.area([4,3]).valueAt(localPos, 666);

                // TODO: finish it
                // expect(grid.valueAt(localPos)).to.equal(666);
            });

        });


    });

});

describe.skip('old stuff', () => {

    describe('findInArea', () => {

        it('should return the position of the first occurrence', () => {
            const data = [
                [0,7,3,2,8],
                [4,2,5,7,8],
                [6,6,6,6,7],
            ];
            const areaDesc = [3,2,2,1];
            const result = gridl(data).findInArea(areaDesc, v => v === 7);
            expect(result).to.deep.equal([3,1]);
        });

        it('should return undefined if the are no findings', () => {
            const data = [
                [0,7,3,2,8],
                [4,2,5,7,8],
                [6,6,6,6,7],
            ];
            const areaDesc = [3,2,2,1];
            const result = gridl(data).findInArea(areaDesc, v => v === 9);
            expect(result).to.equal(undefined);
        });

    });

    describe('positionInArea', () => {

        const mockData = () => ([
            [ 1, 2, 3, 4, 5],
            [ 6, 7, 8, 9,10],
            [11,12,13,14,15],
        ]);

        it('should return true for positions inside the area', () => {
            const data = mockData();
            const areaDesc = [2,2,1,1];
            expect(gridl(data).positionInArea(areaDesc, [0,1])).to.equal(false);
            expect(gridl(data).positionInArea(areaDesc, [1,3])).to.equal(false);
            expect(gridl(data).positionInArea(areaDesc, [3,2])).to.equal(false);
        });

        it('should return false for positions outside the area', () => {
            const data = mockData();
            const areaDesc = [2,2,1,1];
            expect(gridl(data).positionInArea(areaDesc, [0,1])).to.equal(false);
            expect(gridl(data).positionInArea(areaDesc, [1,3])).to.equal(false);
            expect(gridl(data).positionInArea(areaDesc, [3,2])).to.equal(false);
        });

    });

    describe('areaFits', () => {

        const mockData = () => ([
            [1,1,1,1,1,1],
            [1,1,1,1,1,1],
            [1,1,1,1,1,1],
            [1,1,1,1,1,1],
        ]);

        it('should fit with a given position', () => {
            const data = mockData();
            const areaData = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [3,2];
            const areaDesc = gridl.areaDescription(areaData, areaPos);
            const result = gridl(data).areaFits(areaDesc);
            expect(result).to.equal(true);
        });

        it('should not fit at the right', () => {
            const data = mockData();
            const areaDesc = [3,2,4,0];
            const result = gridl(data).areaFits(areaDesc);
            expect(result).to.equal(false);
        });

        it('should not fit at the bottom', () => {
            const data = mockData();
            const areaDesc = [3,2,1,3];
            const result = gridl(data).areaFits(areaDesc);
            expect(result).to.equal(false);
        });

        it('should not fit at the right and the bottom', () => {
            const data = mockData();
            const areaDesc = [3,2,4,3];
            const result = gridl(data).areaFits(areaDesc);
            expect(result).to.equal(false);
        });

        it('should fit with an anchor', () => {
            const data = mockData();
            const areaDesc = [3,2,3,2,1,0];
            const result = gridl(data).areaFits(areaDesc);
            expect(result).to.equal(true);
        });

        it('should not fit with an anchor at the top', () => {
            const data = mockData();
            expect(gridl(data).areaFits([3,2,3,0,0,0])).to.equal(true);
            expect(gridl(data).areaFits([3,2,3,0,0,1])).to.equal(false);
        });

        it('should not fit with an anchor at the left', () => {
            const data = mockData();
            expect(gridl(data).areaFits([3,2,0,2,0,0])).to.equal(true);
            expect(gridl(data).areaFits([3,2,0,2,1,0])).to.equal(false);
        });

        it('should not fit with an anchor at the right', () => {
            const data = mockData();
            expect(gridl(data).areaFits([3,2,4,0,1,0])).to.equal(true);
            expect(gridl(data).areaFits([3,2,4,0,0,0])).to.equal(false);
        });

        it('should not fit with an anchor at the bottom', () => {
            const data = mockData();
            expect(gridl(data).areaFits([3,2,2,3,1,1])).to.equal(true);
            expect(gridl(data).areaFits([3,2,2,3,1,0])).to.equal(false);
        });

    });

    describe('setAreaData', () => {

        it('should set an area at a given position', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const areaData = [
                [4,  1,  8],
                [5,  3,  9],
            ];
            const position = [3, 1];
            const grid = gridl(data).setAreaData(position, areaData).data();
            expect(grid).to.deep.equal([
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9,  4,  1,  8],
                [13, 14, 15,  5,  3,  9],
                [19, 20, 21, 22, 23, 24],
            ]);
        });

        it('should set an irregular shaped area', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
                [25, 26, 27, 28, 29, 20],
            ];
            const area = [
                [0,  0,  0],
                [0,  0],
                [0,  0,  0,  0],
                [0],
            ];
            const position = [2, 1];
            const grid = gridl(data).setAreaData(position, area).data();
            expect(grid).to.deep.equal([
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  0,  0,  0, 12],
                [13, 14,  0,  0, 17, 18],
                [19, 20,  0,  0,  0,  0],
                [25, 26,  0, 28, 29, 20],
            ]);
        });

        it('should ignore values that are out of scope', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const area = [
                [4,  1,  8],
                [5,  3,  9],
            ];
            const position = [4, 3];
            const grid = gridl(data).setAreaData(position, area).data();
            expect(grid).to.deep.equal([
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22,  4,  1],
            ]);
        });

        it('should set an area at a given position and a positive anchor point', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const area = [
                [4,  1,  8],
                [5,  3,  9],
            ];
            const position = [3, 1];
            const anchor = [2, 1];
            const grid = gridl(data).setAreaData(position, area, anchor).data();
            expect(grid).to.deep.equal([
                [ 1,  4,  1,  8,  5,  6],
                [ 7,  5,  3,  9, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ]);
        });

        it('should set an area at a given position and a negative anchor point', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const area = [
                [0,0,0],
                [0,0,0],
            ];
            const position = [2, 0];
            const anchor = [-1, -2];
            const grid = gridl(data).setAreaData(position, area, anchor).data();
            expect(grid).to.deep.equal([
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15,  0,  0,  0],
                [19, 20, 21,  0,  0,  0],
            ]);
        });

        it('should set an area at a position outside the grid and ignore irrelevant values', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const area = [
                [0,0,0],
                [0,0,0],
            ];
            const position = [2, 4];
            const anchor = [1, 1];
            const grid = gridl(data).setAreaData(position, area, anchor).data();
            expect(grid).to.deep.equal([
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19,  0,  0,  0, 23, 24],
            ]);
        });

    });

    describe('getAreaData', () => {

        it('should return the area with a given size at a given location', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const size = [3, 2];
            const position = [1, 2];
            const area = gridl(data).getAreaData(position, size);
            expect(area).to.deep.equal([
                [14, 15, 16],
                [20, 21, 22],
            ]);
        });

        it('should ignore values that are out of scope', () => {
            const data = [
                [ 1,  2,  3],
                [ 7,  8,  9],
                [13, 14, 15],
            ];
            const size = [3, 2];
            const position = [1, 2];
            const area = gridl(data).getAreaAt(position, size);
            expect(area).to.deep.equal([[14, 15]]);
        });

        it('should get an area at a given position and a positive offset', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const position = [2, 1];
            const anchor = [1, 0];
            const size = [3, 2];
            const grid = gridl(data).getAreaAt(position, size, anchor);
            expect(grid).to.deep.equal([
                [ 8,  9, 10],
                [14, 15, 16],
            ]);
        });

        it('should get an area at a given position and a negative offset', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const position = [0, 1];
            const anchor = [-2, -1];
            const size = [3, 2];
            const grid = gridl(data).getAreaAt(position, size, anchor);
            expect(grid).to.deep.equal([
                [15, 16, 17],
                [21, 22, 23],
            ]);
        });

        it('should set an area at a position outside the grid and ignore irrelevant values at the top left', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const position = [0, 0];
            const size = [3,2];
            const anchor = [1, 1];
            const grid = gridl(data).getAreaAt(position, size, anchor);
            expect(grid).to.deep.equal([
                [1,  2],
            ]);
        });

        it('should set an area at a position outside the grid and ignore irrelevant values at the bottom right', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const position = [5, 3];
            const size = [3,2];
            const anchor = [1, 1];
            const grid = gridl(data).getAreaAt(position, size, anchor);
            expect(grid).to.deep.equal([
                [17, 18],
                [23, 24],
            ]);
        });

        it('should not affect the inner data set', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 7, 8, 9],
                [10,11,12,13,14],
                [15,16,17,18,19],
                [20,21,22,23,24],
            ];
            const areaSize = [2,3];
            const areaPosition = [2,1];
            const g = gridl(data);
            g.getAreaAt(areaPosition, areaSize);
            expect(g.data()).to.deep.equal([
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 7, 8, 9],
                [10,11,12,13,14],
                [15,16,17,18,19],
                [20,21,22,23,24],
            ]);
            expect(g.numColumns()).to.equal(5);
            expect(g.numRows()).to.equal(5);
        });

    });

    describe('reduceAreaAt', () => {

        const mockData = () => [
            [ 1, 2, 3, 4],
            [ 5, 6, 7, 8],
            [ 9,10,11,12],
            [13,14,15,16],
            [17,18,19,20],
        ];

        it('should execute the callback on each cell within the area', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            const result = gridl(data).reduceAreaAt(position, size, (acc, value) => acc.concat(value), []);
            expect(result).to.deep.equal([10,11,12,14,15,16]);
        });

        it('should reduce the area to sum of all values', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            // calculate the sum of all cells within the area
            expect(gridl(data).reduceAreaAt(position, size, (res, value) => res + value, 0)).to.equal(78);
        });

        it('should provide the positions on the grid within the callback', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            const result = gridl(data).reduceAreaAt(position, size, (acc, value, pos) => acc.concat([pos]), []);
            expect(result).to.deep.equal([
                [1,2],[2,2],[3,2],
                [1,3],[2,3],[3,3],
            ]);
        });

        it('should provide the gridl instance within the callback', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            const instance = gridl(data);
            const result = instance.reduceAreaAt(position, size, (acc, value, pos, src) => {
                expect(src).to.deep.equal(instance);
                return acc + 1;
            }, 0);
            expect(result).to.equal(6);
        });

        it('should use the initial value if provided', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            expect(gridl(data).reduceAreaAt(position, size, acc => acc, 666)).to.equal(666);
        });

        it('should throw an error if no callback is provided', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            expect(() => gridl(data).reduceAreaAt(position, size)).to.throw();
        });

        it('should throw an error if no size is provided', () => {
            const data = mockData();
            const position = [1,2];
            const errorMsg = 'Trying to reduce an area with invalid size.';
            expect(() => gridl(data).reduceAreaAt(position, undefined, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, 'test', v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, 5, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, { x: 1, y: 2 }, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, [], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, [0], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, [0,1,2], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, ['sdf', 0], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, [0, 'ds'], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(position, [0, 0], v => v)).to.not.throw();
        });

        it('should throw an error if no position is provided', () => {
            const data = mockData();
            const size = [1,2];
            const errorMsg = 'Trying to reduce an area at an invalid position.';
            expect(() => gridl(data).reduceAreaAt(undefined, size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt('test', size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(5, size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt({ x: 1, y: 2 }, size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt([], size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt([0], size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt([0,1,2], size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt(['sdf',1], size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt([1,'sdf'], size, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).reduceAreaAt([0,0], size, v => v)).to.not.throw();
        });

    });

});