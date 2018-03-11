import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';

describe('areas', () => {

    describe('findInArea', () => {

        it('should return the position of the first occurrence', () => {
            const data = [
                [0,7,3,2,8],
                [4,2,5,7,8],
                [6,6,6,6,7],
            ];
            const areaPos = [2,1];
            const areaSize = [3,2];
            const result = gridl(data).findInArea(areaPos, areaSize, v => v === 7);
            expect(result).to.deep.equal([3,1]);
        });

        it('should return undefined if the are no findings', () => {
            const data = [
                [0,7,3,2,8],
                [4,2,5,7,8],
                [6,6,6,6,7],
            ];
            const areaPos = [2,1];
            const areaSize = [3,2];
            const result = gridl(data).findInArea(areaPos, areaSize, v => v === 9);
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
            const area = [1,1,2,2];
            expect(gridl(data).positionInArea(area, [0,1])).to.equal(false);
            expect(gridl(data).positionInArea(area, [1,3])).to.equal(false);
            expect(gridl(data).positionInArea(area, [3,2])).to.equal(false);
        });

        it('should return false for positions outside the area', () => {
            const data = mockData();
            const area = [1,1,2,2];
            expect(gridl(data).positionInArea(area, [0,1])).to.equal(false);
            expect(gridl(data).positionInArea(area, [1,3])).to.equal(false);
            expect(gridl(data).positionInArea(area, [3,2])).to.equal(false);
        });

    });

    describe('areaFitsAt', () => {

        it('should fit with a given position', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [3,2];
            const result = gridl(data).areaFitsAt(areaPos, area);
            expect(result).to.equal(true);
        });

        it('should not fit at the right', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [4,0];
            const result = gridl(data).areaFitsAt(areaPos, area);
            expect(result).to.equal(false);
        });

        it('should not fit at the bottom', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [1,3];
            const result = gridl(data).areaFitsAt(areaPos, area);
            expect(result).to.equal(false);
        });

        it('should not fit at the right and the bottom', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [4,3];
            const result = gridl(data).areaFitsAt(areaPos, area);
            expect(result).to.equal(false);
        });

        it('should fit with an anchor', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [3,2];
            const anchor = [1, 0];
            const result = gridl(data).areaFitsAt(areaPos, area, anchor);
            expect(result).to.equal(true);
        });

        it('should not fit with an anchor at the top', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).areaFitsAt([3,0], area, [0,0])).to.equal(true);
            expect(gridl(data).areaFitsAt([3,0], area, [0,1])).to.equal(false);
        });

        it('should not fit with an anchor at the left', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).areaFitsAt([0,2], area, [0,0])).to.equal(true);
            expect(gridl(data).areaFitsAt([0,2], area, [1,0])).to.equal(false);
        });

        it('should not fit with an anchor at the right', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).areaFitsAt([4,0], area, [1,0])).to.equal(true);
            expect(gridl(data).areaFitsAt([4,0], area, [0,0])).to.equal(false);
        });

        it('should not fit with an anchor at the bottom', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).areaFitsAt([2,3], area, [1,1])).to.equal(true);
            expect(gridl(data).areaFitsAt([2,3], area, [1,0])).to.equal(false);
        });

    });

    describe('areaFits', () => {

        it('should fit with a given position', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [3,2];
            const result = gridl(data).goto(areaPos).areaFits(area);
            expect(result).to.equal(true);
        });

        it('should not fit at the right', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [4,0];
            const result = gridl(data).goto(areaPos).areaFits(area);
            expect(result).to.equal(false);
        });

        it('should not fit at the bottom', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [1,3];
            const result = gridl(data).goto(areaPos).areaFits(area);
            expect(result).to.equal(false);
        });

        it('should not fit at the right and the bottom', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [4,3];
            const result = gridl(data).goto(areaPos).areaFits(area);
            expect(result).to.equal(false);
        });

        it('should fit with an anchor', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            const areaPos = [3,2];
            const anchor = [1, 0];
            const result = gridl(data).goto(areaPos).areaFits(area, anchor);
            expect(result).to.equal(true);
        });

        it('should not fit with an anchor at the top', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).goto([3,0]).areaFits(area, [0,0])).to.equal(true);
            expect(gridl(data).goto([3,0]).areaFits(area, [0,1])).to.equal(false);
        });

        it('should not fit with an anchor at the left', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).goto([0,2]).areaFits(area, [0,0])).to.equal(true);
            expect(gridl(data).goto([0,2]).areaFits(area, [1,0])).to.equal(false);
        });

        it('should not fit with an anchor at the right', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).goto([4,0]).areaFits(area, [1,0])).to.equal(true);
            expect(gridl(data).goto([4,0]).areaFits(area, [0,0])).to.equal(false);
        });

        it('should not fit with an anchor at the bottom', () => {
            const data = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
            ];
            const area = [
                [2,2,2],
                [2,2,2],
            ];
            expect(gridl(data).goto([2,3]).areaFits(area, [1,1])).to.equal(true);
            expect(gridl(data).goto([2,3]).areaFits(area, [1,0])).to.equal(false);
        });

    });

    describe('setAreaAt', () => {

        it('should set an area at a given position', () => {
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
            const grid = gridl(data).setAreaAt(position, area).data();
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
            const grid = gridl(data).setAreaAt(position, area).data();
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
            const grid = gridl(data).setAreaAt(position, area).data();
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
            const grid = gridl(data).setAreaAt(position, area, anchor).data();
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
            const grid = gridl(data).setAreaAt(position, area, anchor).data();
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
            const grid = gridl(data).setAreaAt(position, area, anchor).data();
            expect(grid).to.deep.equal([
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19,  0,  0,  0, 23, 24],
            ]);
        });

    });

    describe('setArea', () => {

        it('should set an area at a given position', () => {
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
            const grid = gridl(data).goto(position).setArea(area).data();
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
            const grid = gridl(data).goto(position).setArea(area).data();
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
            const grid = gridl(data).goto(position).setArea(area).data();
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
            const grid = gridl(data).goto(position).setArea(area, anchor).data();
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
            const grid = gridl(data).goto(position).setArea(area, anchor).data();
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
            const grid = gridl(data).goto(position).setArea(area, anchor).data();
            expect(grid).to.deep.equal([
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19,  0,  0,  0, 23, 24],
            ]);
        });

    });

    describe('getAreaAt', () => {

        it('should return the area with a given size at a given location', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const size = [3, 2];
            const position = [1, 2];
            const area = gridl(data).getAreaAt(position, size);
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

    describe('getArea', () => {

        it('should return the area with a given size at a given location', () => {
            const data = [
                [ 1,  2,  3,  4,  5,  6],
                [ 7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24],
            ];
            const size = [3, 2];
            const position = [1, 2];
            const area = gridl(data).goto(position).getArea(size);
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
            const area = gridl(data).goto(position).getArea(size);
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
            const grid = gridl(data).goto(position).getArea(size, anchor);
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
            const grid = gridl(data).goto(position).getArea(size, anchor);
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
            const grid = gridl(data).goto(position).getArea(size, anchor);
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
            const grid = gridl(data).goto(position).getArea(size, anchor);
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
            g.goto(areaPosition).getArea(areaSize);
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

    describe('reduceArea', () => {

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
            const result = gridl(data).goto(position).reduceArea(size, (acc, value) => acc.concat(value), []);
            expect(result).to.deep.equal([10,11,12,14,15,16]);
        });

        it('should reduce the area to sum of all values', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            // calculate the sum of all cells within the area
            expect(gridl(data).goto(position).reduceArea(size, (res, value) => res + value, 0)).to.equal(78);
        });

        it('should provide the positions on the grid within the callback', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            const result = gridl(data).goto(position).reduceArea(size, (acc, value, pos) => acc.concat([pos]), []);
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
            const result = instance.goto(position).reduceArea(size, (acc, value, pos, src) => {
                expect(src).to.deep.equal(instance);
                return acc + 1;
            }, 0);
            expect(result).to.equal(6);
        });

        it('should use the initial value if provided', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            expect(gridl(data).goto(position).reduceArea(size, acc => acc, 666)).to.equal(666);
        });

        it('should throw an error if no callback is provided', () => {
            const data = mockData();
            const position = [1,2];
            const size = [3,2];
            expect(() => gridl(data).goto(position).reduceArea(size)).to.throw();
        });

        it('should throw an error if no size is provided', () => {
            const data = mockData();
            const position = [1,2];
            const errorMsg = 'Trying to reduce an area with invalid size.';
            expect(() => gridl(data).goto(position).reduceArea(undefined, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea('test', v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea(5, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea({ x: 1, y: 2 }, v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea([], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea([0], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea([0,1,2], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea(['sdf', 0], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea([0, 'ds'], v => v)).to.throw(errorMsg);
            expect(() => gridl(data).goto(position).reduceArea([0, 0], v => v)).to.not.throw();
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
