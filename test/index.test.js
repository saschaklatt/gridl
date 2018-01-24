import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../src';

const checkApi = api => {
    expect(Object.keys(api)).to.have.members([
        'columns',
        'rows',
        'size',
        'getValueAt',
        'setValueAt',
        'getRow',
        'getColumn',
        'checkAreaFitsAt',
        'getRelativePosition',
        'getRelativeValue',
        'moveCell',
        'moveCellFrom',
        'moveRow',
        'moveColumn',
        'addRowAt',
        'addColumnAt',
        'removeRowAt',
        'removeColumnAt',
        'clip',
        'swapCells',
        'swapRows',
        'swapColumns',
        'setAreaAt',
        'getAreaAt',
        'findPosition',
        'findPositionInArea',
        'getData',
        'rotate',
        'mirrorX',
        'mirrorY',
    ]);
};

describe('gridl', () => {

    describe('api', () => {

        it('should return the expected api', () => {
            checkApi(gridl([[0]]));
        });

    });

    describe('validation', () => {

        it('should throw an error if data is not an array', () => {
            expect(() => gridl('dsfsdf', {})).to.throw();
            expect(() => gridl(undefined, {})).to.throw();
            expect(() => gridl(null, {})).to.throw();
            expect(() => gridl({}, {})).to.throw();
            expect(() => gridl([[]], {})).to.throw();
        });

        it('should throw an error if the arrayType is invalid', () => {
            expect(() => gridl([], { arrayType: '???' })).to.throw();
            expect(() => gridl([], { arrayType: 12 })).to.throw();
        });

        it('should throw an error if you don\'t provide any columns', () => {
            const expectedMsg = 'Trying to import grid without any columns. You need to provide at least one column.';
            expect(() => gridl([[]], {})).to.throw(expectedMsg);
            expect(() => gridl([
                [],
                [],
                [],
            ], {})).to.throw(expectedMsg);
        });

        it('should work with at least one cell', () => {
            expect(() => gridl([[7]], {})).to.not.throw();
        });

    });

    describe('importing', () => {

        describe('validation', () => {

            it('should throw no error if the data structure is valid', () => {
                const data = [
                    [1, 2, 3],
                    [4, 5, 6],
                ];
                expect(() => gridl(data)).to.not.throw();
            });

            it('should throw an error if the data is undefined', () => {
                expect(() => gridl()).to.throw('Trying to import data that is not an array.');
            });

            it('should throw an error if the a rows is not an array', () => {
                const expectedMsg = 'Trying to import data that is not an array.';
                expect(() => gridl([
                    [1,2,3],
                    5,
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    5,
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1,2,3],
                    'dsf',
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1,2,3],
                    [1,2,3],
                    { '0': 0, '1': 1, '2': 2 },
                ])).to.throw(expectedMsg);
            });

            it('should throw an error if the row lengths are not equal', () => {
                const expectedMsg = 'Trying to import data with different row lengths.';
                expect(() => gridl([
                    [1,2,3],
                    [1,2],
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1,2,3,4],
                    [1,2,3],
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1],
                    [1],
                    [1,2,3],
                ])).to.throw(expectedMsg);
            });

        });

    });

    describe('getData', () => {

        it('should export 2d without dimensions given', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const g = gridl(data);
            expect(g.getData()).to.deep.equal([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]);
        });

        it('should export 2d with rows only given', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
            ];
            const g = gridl(data);
            expect(g.getData()).to.deep.equal([
                [1, 2, 3],
                [4, 5, 6],
            ]);
        });

        it('should export 2d with columns only given', () => {
            const data = [
                [4, 5, 6],
                [7, 8, 9],
            ];
            const g = gridl(data);
            expect(g.getData()).to.deep.equal([
                [4, 5, 6],
                [7, 8, 9],
            ]);
        });

    });

    describe('dimensions', () => {

        it('should use default size without options', () => {
            const data = [
                [1,2,3,4,5,6]
            ];
            const g = gridl(data);
            expect(g.rows()).to.equal(1);
            expect(g.columns()).to.equal(6);
            expect(g.size()).to.deep.equal([6, 1]);
        });

        it('should get the columns', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
            ];
            const g = gridl(data);
            expect(g.columns()).to.equal(2);
        });

        it('should get the rows', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            const g = gridl(data);
            expect(g.rows()).to.equal(2);
        });

        it('should get the size', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            const g = gridl(data);
            expect(g.size()).to.deep.equal([3,2]);
        });

    });

    describe('getValueAt', () => {

        it('should return the value at a certain position', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            const g = gridl(data);
            expect(g.getValueAt([0,0])).to.equal(1);
            expect(g.getValueAt([1,0])).to.equal(2);
            expect(g.getValueAt([0,1])).to.equal(5);
            expect(g.getValueAt([2,1])).to.equal(7);
        });

        it('should return undefined position is invalid', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            const g = gridl(data);
            expect(g.getValueAt('wrong')).to.equal(undefined);
            expect(g.getValueAt({})).to.equal(undefined);
            expect(g.getValueAt([])).to.equal(undefined);
            expect(g.getValueAt([-1, 100])).to.equal(undefined);
            expect(g.getValueAt()).to.equal(undefined);
        });

    });

    describe('setValueAt', () => {

        it('should set the value at a certain position', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            const g = gridl(data);
            expect(g.getValueAt([0,2])).to.equal(5);
            checkApi(g.setValueAt([0,2], 666));
            expect(g.getValueAt([0,2])).to.equal(666);
        });

        it('should set the value at a certain position', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            const g = gridl(data);
            expect(g.getValueAt([0,2])).to.equal(5);
            checkApi(g.setValueAt('ludicrous', 666));
            expect(g.getValueAt([0,2])).to.equal(5);
        });

        it('should return the api', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            checkApi(gridl(data).setValueAt([0,2], 666));
        });

    });

    describe('getRow', () => {

        it('should get me the row at a certain y-position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).getRow(0)).to.deep.equal([1,2,3]);
            expect(gridl(data).getRow(1)).to.deep.equal([4,5,6]);
            expect(gridl(data).getRow(2)).to.deep.equal([7,8,9]);
        });

        it('should return undefined for positions that are outside of the grid', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).getRow(-1)).to.deep.equal(undefined);
            expect(gridl(data).getRow(3)).to.deep.equal(undefined);
            expect(() => gridl(data).getRow(-1)).to.not.throw();
        });

    });

    describe('getColumn', () => {

        it('should get me the column at a certain x-position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).getColumn(0)).to.deep.equal([1,4,7]);
            expect(gridl(data).getColumn(1)).to.deep.equal([2,5,8]);
            expect(gridl(data).getColumn(2)).to.deep.equal([3,6,9]);
        });

        it('should return undefined for positions that are outside of the grid', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).getColumn(-1)).to.deep.equal(undefined);
            expect(gridl(data).getColumn(3)).to.deep.equal(undefined);
            expect(() => gridl(data).getColumn(-1)).to.not.throw();
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
            const grid = gridl(data).setAreaAt(position, area).getData();
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
            const grid = gridl(data).setAreaAt(position, area).getData();
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
            const grid = gridl(data).setAreaAt(position, area).getData();
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
            const grid = gridl(data).setAreaAt(position, area, anchor).getData();
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
            const grid = gridl(data).setAreaAt(position, area, anchor).getData();
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
            const grid = gridl(data).setAreaAt(position, area, anchor).getData();
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
            expect(g.getData()).to.deep.equal([
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 7, 8, 9],
                [10,11,12,13,14],
                [15,16,17,18,19],
                [20,21,22,23,24],
            ]);
            expect(g.columns()).to.equal(5);
            expect(g.rows()).to.equal(5);
        });

    });

    describe('findPosition', () => {

        it('should return the position of the first occurrence', () => {
            const data = [
                [1,2,3],
                [4,2,5],
                [6,5,4],
            ];
            const position = gridl(data).findPosition(v => v === 5);
            expect(position).to.deep.equal([2,1]);
        });

        it('should return -1 if the are no findings', () => {
            const data = [
                [1,2,3],
                [4,2,5],
                [6,6,6],
            ];
            const index = gridl(data).findPosition(v => v === 'something else');
            expect(index).to.equal(undefined);
        });

    });

    describe('findPositionInArea', () => {

        it('should return the position of the first occurrence', () => {
            const data = [
                [0,7,3,2,8],
                [4,2,5,7,8],
                [6,6,6,6,7],
            ];
            const areaPos = [2,1];
            const areaSize = [3,2];
            const result = gridl(data).findPositionInArea(areaPos, areaSize, v => v === 7);
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
            const result = gridl(data).findPositionInArea(areaPos, areaSize, v => v === 9);
            expect(result).to.equal(undefined);
        });

    });

    describe('checkAreaFitsAt', () => {

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
            const result = gridl(data).checkAreaFitsAt(areaPos, area);
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
            const result = gridl(data).checkAreaFitsAt(areaPos, area);
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
            const result = gridl(data).checkAreaFitsAt(areaPos, area);
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
            const result = gridl(data).checkAreaFitsAt(areaPos, area);
            expect(result).to.equal(false);
        });

    });

    describe('getRelativePosition', () => {

        it('should get me the position relative to my start position', () => {
            const data = [
                [ 1, 2, 3, 4,21],
                [ 5, 6, 7, 8,22],
                [ 9,10,11,12,23],
                [13,14,15,16,24],
                [17,18,19,20,25],
            ];
            const g = gridl(data);
            expect(g.getRelativePosition([2,3], [-2, 1])).to.deep.equal([0, 4]);
            expect(g.getRelativePosition([2,3], [ 0, 1])).to.deep.equal([2, 4]);
            expect(g.getRelativePosition([2,3], [ 2,-3])).to.deep.equal([4, 0]);
            expect(g.getRelativePosition([2,3], [ 1,-1])).to.deep.equal([3, 2]);
            expect(g.getRelativePosition([2,3], [ 0, 0])).to.deep.equal([2, 3]);
        });

        it('should get me all my neighbours', () => {
            const data = [
                [ 1, 2, 3, 4,21],
                [ 5, 6, 7, 8,22],
                [ 9,10,11,12,23],
                [13,14,15,16,24],
                [17,18,19,20,25],
            ];
            const g = gridl(data);
            const { TOP, TOP_LEFT, TOP_RIGHT, BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT, LEFT, RIGHT} = gridl.directions;
            expect(g.getRelativePosition([2,3], TOP         )).to.deep.equal([2,2]);
            expect(g.getRelativePosition([2,3], TOP_RIGHT   )).to.deep.equal([3,2]);
            expect(g.getRelativePosition([2,3], RIGHT       )).to.deep.equal([3,3]);
            expect(g.getRelativePosition([2,3], BOTTOM_RIGHT)).to.deep.equal([3,4]);
            expect(g.getRelativePosition([2,3], BOTTOM      )).to.deep.equal([2,4]);
            expect(g.getRelativePosition([2,3], BOTTOM_LEFT )).to.deep.equal([1,4]);
            expect(g.getRelativePosition([2,3], LEFT        )).to.deep.equal([1,3]);
            expect(g.getRelativePosition([2,3], TOP_LEFT    )).to.deep.equal([1,2]);
        });

        it('should get me undefined for positions that are out of scope', () => {
            const data = [
                [ 1, 2, 3, 4,21],
                [ 5, 6, 7, 8,22],
                [ 9,10,11,12,23],
                [13,14,15,16,24],
                [17,18,19,20,25],
            ];
            const g = gridl(data);
            expect(g.getRelativePosition([0,0], [-1, 0])).to.deep.equal(undefined);
            expect(g.getRelativePosition([0,0], [ 0,-1])).to.deep.equal(undefined);
            expect(g.getRelativePosition([0,0], [ 5, 5])).to.deep.equal(undefined);
            expect(g.getRelativePosition([3,2], [ 2, 0])).to.deep.equal(undefined);
            expect(g.getRelativePosition([3,2], [ 0, 3])).to.deep.equal(undefined);
        });

    });

    describe('getRelativeValue', () => {

        it('should get me the value relative to my start position', () => {
            const data = [
                [ 1, 2, 3, 4,21],
                [ 5, 6, 7, 8,22],
                [ 9,10,11,12,23],
                [13,14,15,16,24],
                [17,18,19,20,25],
            ];
            const g = gridl(data);
            expect(g.getRelativeValue([2,3], [-2, 1])).to.deep.equal(17);
            expect(g.getRelativeValue([2,3], [ 0, 1])).to.deep.equal(19);
            expect(g.getRelativeValue([2,3], [ 2,-3])).to.deep.equal(21);
            expect(g.getRelativeValue([2,3], [ 1,-1])).to.deep.equal(12);
            expect(g.getRelativeValue([2,3], [ 0, 0])).to.deep.equal(15);
        });

        it('should get me all my neighbours', () => {
            const data = [
                [ 1, 2, 3, 4,21],
                [ 5, 6, 7, 8,22],
                [ 9,10,11,12,23],
                [13,14,15,16,24],
                [17,18,19,20,25],
            ];
            const g = gridl(data);
            const { TOP, TOP_LEFT, TOP_RIGHT, BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT, LEFT, RIGHT} = gridl.directions;
            expect(g.getRelativeValue([2,3], TOP         )).to.deep.equal(11);
            expect(g.getRelativeValue([2,3], TOP_RIGHT   )).to.deep.equal(12);
            expect(g.getRelativeValue([2,3], RIGHT       )).to.deep.equal(16);
            expect(g.getRelativeValue([2,3], BOTTOM_RIGHT)).to.deep.equal(20);
            expect(g.getRelativeValue([2,3], BOTTOM      )).to.deep.equal(19);
            expect(g.getRelativeValue([2,3], BOTTOM_LEFT )).to.deep.equal(18);
            expect(g.getRelativeValue([2,3], LEFT        )).to.deep.equal(14);
            expect(g.getRelativeValue([2,3], TOP_LEFT    )).to.deep.equal(10);
        });

        it('should get me undefined for positions out of scope', () => {
            const data = [
                [ 1, 2, 3, 4,21],
                [ 5, 6, 7, 8,22],
                [ 9,10,11,12,23],
                [13,14,15,16,24],
                [17,18,19,20,25],
            ];
            const g = gridl(data);
            expect(g.getRelativeValue([0,0], [-1, 0])).to.deep.equal(undefined);
            expect(g.getRelativeValue([0,0], [ 0,-1])).to.deep.equal(undefined);
            expect(g.getRelativeValue([0,0], [ 5, 5])).to.deep.equal(undefined);
            expect(g.getRelativeValue([3,2], [ 2, 0])).to.deep.equal(undefined);
            expect(g.getRelativeValue([3,2], [ 0, 3])).to.deep.equal(undefined);
        });


    });

    describe('generateData', () => {

        it('should generate a grid with (column, row) value pairs', () => {
            const columns = 4;
            const rows = 3;
            const grid = gridl.generateData(columns, rows, ({ column, row }) => `${column},${row}`);
            expect(grid).to.deep.equal([
                ['0,0', '1,0', '2,0', '3,0'],
                ['0,1', '1,1', '2,1', '3,1'],
                ['0,2', '1,2', '2,2', '3,2'],
            ]);
        });

        it('should generate a grid filled with "x"-values', () => {
            const columns = 7;
            const rows = 5;
            const grid = gridl.generateData(columns, rows, () => 'x');
            expect(grid).to.deep.equal([
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ]);
        });

        it('should throw an error if you provide invalid number of rows', () => {
            expect(
                () => gridl.generateData(4, 0, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: 0'
            );

            expect(
                () => gridl.generateData(4, -1, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: -1'
            );

            expect(
                () => gridl.generateData(4, 'balderdash', () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: balderdash'
            );
        });

        it('should throw an error if you provide invalid number of columns', () => {
            expect(
                () => gridl.generateData('balderdash', 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: balderdash'
            );

            expect(
                () => gridl.generateData(-1, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: -1'
            );

            expect(
                () => gridl.generateData(0, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: 0'
            );
        });
    });

    describe('generate', () => {

        it('should generate a grid with (column, row) value pairs', () => {
            const columns = 4;
            const rows = 3;
            const grid = gridl.generate(columns, rows, ({ column, row }) => `${column},${row}`).getData();
            expect(grid).to.deep.equal([
                ['0,0', '1,0', '2,0', '3,0'],
                ['0,1', '1,1', '2,1', '3,1'],
                ['0,2', '1,2', '2,2', '3,2'],
            ]);
        });

        it('should generate a grid filled with "x"-values', () => {
            const columns = 7;
            const rows = 5;
            const grid = gridl.generate(columns, rows, () => 'x').getData();
            expect(grid).to.deep.equal([
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ]);
        });

        it('should throw an error if you provide invalid number of rows', () => {
            expect(
                () => gridl.generate(4, 0, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: 0'
            );

            expect(
                () => gridl.generate(4, -1, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: -1'
            );

            expect(
                () => gridl.generate(4, 'balderdash', () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: balderdash'
            );
        });

        it('should throw an error if you provide invalid number of columns', () => {
            expect(
                () => gridl.generate('balderdash', 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: balderdash'
            );

            expect(
                () => gridl.generate(-1, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: -1'
            );

            expect(
                () => gridl.generate(0, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: 0'
            );
        });

    });

    describe('moveCell', () => {

        it('should move a cell from lower to a higher index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const from = [2,1];
            const to = [3,4];
            expect(gridl(grid).moveCell(from, to).getData()).to.deep.equal([
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8,10,11,12,13],
                [14,15,16,17,18,19],
                [20,21,22,23,24,25],
                [26,27,28, 9,29,30],
            ]);
        });

        it('should move a cell from higher to a lower index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const from = [4,3];
            const to = [1,0];
            expect(gridl(grid).moveCell(from, to).getData()).to.deep.equal([
                [ 1,23, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10,11],
                [12,13,14,15,16,17],
                [18,19,20,21,22,24],
                [25,26,27,28,29,30],
            ]);
        });

        it('should throw an error if "from" is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).moveCell([-1,0], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [-1,0]'
            );
            expect(
                () => gridl(grid).moveCell([0,-1], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [0,-1]'
            );
            expect(
                () => gridl(grid).moveCell([1,5], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).moveCell([6,0], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [6,0]'
            );
            expect(
                () => gridl(grid).moveCell('balderdash', [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [balderdash]'
            );
        });

        it('should throw an error if "to" is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).moveCell([1,4], [-1,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [-1,0]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], [0,-1])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [0,-1]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], [1,5])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], [6,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [6,0]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], 'balderdash')
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [balderdash]'
            );
        });

    });

    describe('moveCellFrom', () => {

        it('should move a cell from a lower to a higher index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const position = [1,2];
            const direction = [3,2];
            expect(gridl(grid).moveCellFrom(position, direction).getData()).to.deep.equal([
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,15,16,17,18,19],
                [20,21,22,23,24,25],
                [26,27,28,29,14,30],
            ]);
        });

        it('should move a cell from a higher to a lower index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const position = [4,3];
            const direction = [-2,-1];
            expect(gridl(grid).moveCellFrom(position, direction).getData()).to.deep.equal([
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,23,15,16,17],
                [18,19,20,21,22,24],
                [25,26,27,28,29,30],
            ]);
        });

        it('should throw an error if "position" is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).moveCellFrom([-1,0], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [-1,0]'
            );
            expect(
                () => gridl(grid).moveCellFrom([0,-1], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [0,-1]'
            );
            expect(
                () => gridl(grid).moveCellFrom([1,5], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).moveCellFrom([6,0], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [6,0]'
            );
            expect(
                () => gridl(grid).moveCellFrom('balderdash', [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [balderdash]'
            );
        });

        it('should throw an error if "direction" is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).moveCellFrom([1,4], [0,1])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).moveCellFrom([1,4], [0,-5])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1,-1]'
            );
            expect(
                () => gridl(grid).moveCellFrom([1,4], [-2,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [-1,4]'
            );
            expect(
                () => gridl(grid).moveCellFrom([1,4], [5,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [6,4]'
            );
            expect(
                () => gridl(grid).moveCellFrom([1,4], 'balderdash')
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1b,4a]' // FIXME: improve error message: [1b,4a]
            );
        });

    });

    describe('moveRow', () => {

        it('should move a row at y=0 to y=2', () => {
            const data = [
                [ 1, 2, 3],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [10,11,12],
                [13,14,15],
            ];
            expect(gridl(data).moveRow(0, 2).getData()).to.deep.equal([
                [ 4, 5, 6],
                [ 7, 8, 9],
                [ 1, 2, 3],
                [10,11,12],
                [13,14,15],
            ]);
        });

        it('should move a row at y=3 to y=1', () => {
            const data = [
                [ 1, 2, 3],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [10,11,12],
                [13,14,15],
            ];
            expect(gridl(data).moveRow(3, 1).getData()).to.deep.equal([
                [ 1, 2, 3],
                [10,11,12],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [13,14,15],
            ]);
        });

        it('should throw an error if the fromY value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(-1, 0)).to.throw('Trying to move row from an invalid position. Given: -1');
        });

        it('should throw an error if the fromY value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(2, 0)).to.throw('Trying to move row from an invalid position. Given: 2');
        });

        it('should throw an error if the toY value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(1, -1)).to.throw('Trying to move row to an invalid position. Given: -1');
        });

        it('should throw an error if the toY value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(1, 3)).to.throw('Trying to move row to an invalid position. Given: 3');
        });

    });

    describe('moveColumn', () => {

        it('should move a column at x=0 to x=2', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
            ];
            expect(gridl(data).moveColumn(0, 2).getData()).to.deep.equal([
                [ 2, 3, 1, 4],
                [ 6, 7, 5, 8],
                [10,11, 9,12],
            ]);
        });

        it('should move a column at x=3 to x=1', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
            ];
            expect(gridl(data).moveColumn(3, 1).getData()).to.deep.equal([
                [ 1, 4, 2, 3],
                [ 5, 8, 6, 7],
                [ 9,12,10,11],
            ]);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2]]).moveColumn(0, 1));
        });

        it('should throw an error if the fromX value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(-1, 0)).to.throw('Trying to move column from an invalid position. Given: -1');
        });

        it('should throw an error if the fromX value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(3, 0)).to.throw('Trying to move column from an invalid position. Given: 3');
        });

        it('should throw an error if the toX value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(1, -1)).to.throw('Trying to move column to an invalid position. Given: -1');
        });

        it('should throw an error if the toX value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(1, 3)).to.throw('Trying to move column to an invalid position. Given: 3');
        });

    });

    describe('addRowAt', () => {

        it('should add a row at the top', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRowAt(row, 0).getData()).to.deep.equal([
                [7,8,9],
                [1,2,3],
                [4,5,6],
            ]);
        });

        it('should add a row at the bottom', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRowAt(row, 2).getData()).to.deep.equal([
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ]);
        });

        it('should add a row somewhere in the middle', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRowAt(row, 1).getData()).to.deep.equal([
                [1,2,3],
                [7,8,9],
                [4,5,6],
            ]);
        });

        it('should update the amount of rows', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRowAt(row, 1).rows()).to.equal(3);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2]]).addRowAt([3,4], 1));
        });

        it('should throw an error if the position is too low', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(() => gridl(data).addRowAt(row, -1)).to.throw(
                'Trying to add row at an invalid position. Given: -1'
            );
        });

        it('should throw an error if the position is too high', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(() => gridl(data).addRowAt(row, 3)).to.throw(
                'Trying to add row at an invalid position. Given: 3'
            );
        });

        it('should throw an error if the row contains an invalid amount of cells', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            expect(() => gridl(data).addRowAt([7,8], 0).getData()).to.throw(
                'Trying to add a row that contains an invalid amount of cells. Expected: 3, Given: 2'
            );
            expect(() => gridl(data).addRowAt([7,8,9,10], 0).getData()).to.throw(
                'Trying to add a row that contains an invalid amount of cells. Expected: 3, Given: 4'
            );
        });

    });

    describe('addColumnAt', () => {

        it('should add a column at the very left', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [
                7,
                8,
            ];
            expect(gridl(data).addColumnAt(column, 0).getData()).to.deep.equal([
                [7,1,2,3],
                [8,4,5,6],
            ]);
        });

        it('should add a column at the very right', () => {
            const data= [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            const column = [
                9,
                9,
                9,
            ];
            expect(gridl(data).addColumnAt(column, 3).getData()).to.deep.equal([
                [1,2,3,9],
                [4,5,6,9],
                [7,8,9,9],
            ]);
        });

        it('should add a column somewhere in the middle', () => {
            const data= [
                [1,2],
                [4,5],
            ];
            const column = [
                7,
                8,
            ];
            expect(gridl(data).addColumnAt(column, 1).getData()).to.deep.equal([
                [1,7,2],
                [4,8,5],
            ]);
        });

        it('should update the amount of columns', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [
                7,
                8,
            ];
            expect(gridl(data).addColumnAt(column, 1).columns()).to.equal(4);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2],[5,6]]).addColumnAt([3,4], 1));
        });

        it('should throw an error if the position is too low', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [7,8];
            expect(() => gridl(data).addColumnAt(column, -1)).to.throw(
                'Trying to add column at an invalid position. Given: -1'
            );
        });

        it('should throw an error if the position is too high', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [7,8,9];
            expect(() => gridl(data).addColumnAt(column, 4)).to.throw(
                'Trying to add column at an invalid position. Given: 4'
            );
        });

        it('should throw an error if the column contains an invalid amount of cells', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            expect(() => gridl(data).addColumnAt([7], 0).getData()).to.throw(
                'Trying to add a column that contains an invalid amount of cells. Expected: 2, Given: 1'
            );
            expect(() => gridl(data).addColumnAt([7,8,9], 0).getData()).to.throw(
                'Trying to add a column that contains an invalid amount of cells. Expected: 2, Given: 3'
            );
        });

    });

    describe('removeRowAt', () => {

        it('should remove a row from the top', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRowAt(0).getData()).to.deep.equal([
                [4,5,6],
                [7,8,9],
            ]);
        });

        it('should remove a row from the middle', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRowAt(1).getData()).to.deep.equal([
                [1,2,3],
                [7,8,9],
            ]);
        });

        it('should remove a row from the bottom', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRowAt(2).getData()).to.deep.equal([
                [1,2,3],
                [4,5,6],
            ]);
        });

        it('should update the number of rows', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRowAt(1).rows()).to.equal(2);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2],[5,6]]).removeRowAt(0));
        });

        it('should throw an error if the position is too low', () => {
            expect(() => gridl([
                [1,2],
                [2,3],
            ]).removeRowAt(-1)).to.throw('Trying to remove a row at an invalid position. Given: -1');
        });

        it('should throw an error if the position is too high', () => {
            expect(() => gridl([
                [1,2],
                [2,3],
            ]).removeRowAt(2)).to.throw('Trying to remove a row at an invalid position. Given: 2');
        });

        it('should throw an error if there would be empty after removing', () => {
            expect(() => gridl([
                [1,2],
            ]).removeRowAt(0)).to.throw('Cannot remove row because the grid would be empty after it.');
        });

    });

    describe('removeColumnAt', () => {

        it('should remove a column from the very left', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumnAt(0).getData()).to.deep.equal([
                [2,3],
                [5,6],
            ]);
        });

        it('should remove a column from the middle', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumnAt(1).getData()).to.deep.equal([
                [1,3],
                [4,6],
            ]);
        });

        it('should remove a column from the very right', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumnAt(2).getData()).to.deep.equal([
                [1,2],
                [4,5],
            ]);
        });

        it('should update the number of columns', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumnAt(0).columns()).to.equal(2);
        });

        it('should return the api', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            checkApi(gridl(data).removeColumnAt(0));
        });

        it('should throw an error if the position is too low', () => {
            expect(() => gridl([
                [1,2,3],
                [4,5,6],
            ]).removeColumnAt(-1)).to.throw('Trying to remove a column at an invalid position. Given: -1');
        });

        it('should throw an error if the position is too high', () => {
            expect(() => gridl([
                [1,2,3],
                [4,5,6],
            ]).removeColumnAt(3)).to.throw('Trying to remove a column at an invalid position. Given: 3');
        });

        it('should throw an error if there would not be empty after removing', () => {
            expect(() => gridl([
                [1],
                [4],
            ]).removeColumnAt(0)).to.throw('Cannot remove column because the grid would be empty after it.');
        });

    });

    describe('clip', () => {

        it('should clip an area out of the middle', () => {
           const data = [
               [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10],
               [11,12,13,14,15,16,17,18,19,20],
               [21,22,23,24,25,26,27,28,29,30],
               [31,32,33,34,35,36,37,38,39,40],
               [41,42,43,44,45,46,47,48,49,50],
               [51,52,53,54,55,56,57,58,59,60],
           ];
           const position = [4,1];
           const size = [3,2];
           const g = gridl(data);
           expect(g.clip(position, size).getData()).to.deep.equal([
               [15,16,17],
               [25,26,27],
           ]);
           expect(g.columns()).to.equal(3);
           expect(g.rows()).to.equal(2);
        });

        it('should clip an area out of the top left corner', () => {
            const data = [
                [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10],
                [11,12,13,14,15,16,17,18,19,20],
                [21,22,23,24,25,26,27,28,29,30],
                [31,32,33,34,35,36,37,38,39,40],
                [41,42,43,44,45,46,47,48,49,50],
                [51,52,53,54,55,56,57,58,59,60],
            ];
            const position = [0,0];
            const size = [2,4];
            const g = gridl(data);
            expect(g.clip(position, size).getData()).to.deep.equal([
                [ 1, 2],
                [11,12],
                [21,22],
                [31,32],
            ]);
            expect(g.columns()).to.equal(2);
            expect(g.rows()).to.equal(4);
        });

        it('should clip an area out of the bottom right corner', () => {
            const data = [
                [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10],
                [11,12,13,14,15,16,17,18,19,20],
                [21,22,23,24,25,26,27,28,29,30],
                [31,32,33,34,35,36,37,38,39,40],
                [41,42,43,44,45,46,47,48,49,50],
                [51,52,53,54,55,56,57,58,59,60],
            ];
            const position = [8,2];
            const size = [2,4];
            const g = gridl(data);
            expect(g.clip(position, size).getData()).to.deep.equal([
                [29,30],
                [39,40],
                [49,50],
                [59,60],
            ]);
            expect(g.columns()).to.equal(2);
            expect(g.rows()).to.equal(4);
        });

        it('should ignore values that are out of scope', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
                [16,17,18,19,20],
            ];
            const position = [3,2];
            const size = [3,5];
            expect(gridl(data).clip(position, size).getData()).to.deep.equal([
                [14,15],
                [19,20],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
                [16,17,18,19,20],
            ];
            checkApi(gridl(data).clip([1,1], [3,5]));
        });

        it('should throw an error if the position is invalid', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 6, 7, 8, 9],
                [11,12,13,14],
            ];
            const size = [2,2];
            expect(() => gridl(data).clip([-1, 0], size)).to.throw('Trying to clip data at an invalid position. Given: -1,0');
            expect(() => gridl(data).clip([ 0,-1], size)).to.throw('Trying to clip data at an invalid position. Given: 0,-1');
            expect(() => gridl(data).clip([ 4, 1], size)).to.throw('Trying to clip data at an invalid position. Given: 4,1');
            expect(() => gridl(data).clip([ 2, 3], size)).to.throw('Trying to clip data at an invalid position. Given: 2,3');
        });

    });

    describe('swapCells', () => {

        it('should swap to two cells', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            expect(gridl(data).swapCells([0,0], [2,1]).getData()).to.deep.equal([
                [7,2,3,4],
                [5,6,1,8],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            checkApi(gridl(data).swapCells([0,0], [2,1]));
        });

        it('throw an error if the positions are invalid', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            expect(() => gridl(data).swapCells([-1,0], [2,1])).to.throw('Trying to swap cells with an invalid position.');
            expect(() => gridl(data).swapCells([0,-1], [2,1])).to.throw('Trying to swap cells with an invalid position.');
            expect(() => gridl(data).swapCells([6,0], [2,1])).to.throw('Trying to swap cells with an invalid position.');
            expect(() => gridl(data).swapCells([1,3], [2,1])).to.throw('Trying to swap cells with an invalid position.');
            expect(() => gridl(data).swapCells([0,0], [-1,0])).to.throw('Trying to swap cells with an invalid position.');
            expect(() => gridl(data).swapCells([0,0], [4,0])).to.throw('Trying to swap cells with an invalid position.');
            expect(() => gridl(data).swapCells([0,0], [0,-1])).to.throw('Trying to swap cells with an invalid position.');
            expect(() => gridl(data).swapCells([0,0], [0,2])).to.throw('Trying to swap cells with an invalid position.');
        });

    });

    describe('swapRows', () => {

        it('should swap two rows', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
                [13,14,15,16],
            ];
            expect(gridl(data).swapRows(1,3).getData()).to.deep.equal([
                [ 1, 2, 3, 4],
                [13,14,15,16],
                [ 9,10,11,12],
                [ 5, 6, 7, 8],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
            ];
            checkApi(gridl(data).swapRows(0,1));
        });

        it('should throw an error if "y1" is invalid', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
            ];
            expect(() => gridl(data).swapRows(-1,1)).to.throw('Trying to swap rows from an invalid position. Given: -1');
            expect(() => gridl(data).swapRows(2,1)).to.throw('Trying to swap rows from an invalid position. Given: 2');
        });

        it('should throw an error if "y2" is invalid', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
            ];
            expect(() => gridl(data).swapRows(0,-1)).to.throw('Trying to swap rows to an invalid position. Given: -1');
            expect(() => gridl(data).swapRows(0,2)).to.throw('Trying to swap rows to an invalid position. Given: 2');
        });

    });

    describe('swapColumns', () => {

        it('should swap to columns', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
                [13,14,15,16],
            ];
            expect(gridl(data).swapColumns(1,3).getData()).to.deep.equal([
                [ 1, 4, 3, 2],
                [ 5, 8, 7, 6],
                [ 9,12,11,10],
                [13,16,15,14],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
                [13,14,15,16],
            ];
            checkApi(gridl(data).swapColumns(1,3));
        });

        it('should throw an error if "x1" is invalid', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
            ];
            expect(() => gridl(data).swapColumns(-1,3)).to.throw('Trying to swap columns from an invalid position. Given: -1');
            expect(() => gridl(data).swapColumns(4,3)).to.throw('Trying to swap columns from an invalid position. Given: 4');
        });

        it('should throw an error if "x2" is invalid', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
            ];
            expect(() => gridl(data).swapColumns(1,-1)).to.throw('Trying to swap columns to an invalid position. Given: -1');
            expect(() => gridl(data).swapColumns(1,4)).to.throw('Trying to swap columns to an invalid position. Given: 4');
        });

    });

    describe('rotate', () => {

        it('should rotate a square array 90 degrees clockwise', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 7, 8, 9],
                [10,11,12,13,14],
                [15,16,17,18,19],
                [20,21,22,23,24],
            ];
            expect(gridl(data).rotate(1).getData()).to.deep.equal([
                [20,15,10, 6, 1],
                [21,16,11, 7, 2],
                [22,17,12, 7, 3],
                [23,18,13, 8, 4],
                [24,19,14, 9, 5],
            ]);
        });

        it('should rotate a rectangular array 90 degrees and 90-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [ 1, 2, 3],
                    [ 6, 7, 7],
                    [10,11,12],
                    [15,16,17],
                    [20,21,22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).getData()).to.deep.equal([
                    [20,15,10, 6, 1],
                    [21,16,11, 7, 2],
                    [22,17,12, 7, 3],
                ]);
                expect(g.columns()).to.equal(5);
                expect(g.rows()).to.equal(3);
            }
            checkWithSteps(1);
            checkWithSteps(-3);
            checkWithSteps(-7);
            checkWithSteps(5);
            checkWithSteps(9);
            checkWithSteps(13);
            checkWithSteps(4000001);
        });

        it('should rotate a rectangular array 180 degrees and 180-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [1, 2, 3],
                    [6, 7, 8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).getData()).to.deep.equal([
                    [20, 21, 22],
                    [15, 16, 17],
                    [10, 11, 12],
                    [6, 7, 8],
                    [1, 2, 3],
                ]);
                expect(g.columns()).to.equal(3);
                expect(g.rows()).to.equal(5);
            }
            checkWithSteps(2);
            checkWithSteps(-2);
            checkWithSteps(-6);
            checkWithSteps(6);
            checkWithSteps(10);
            checkWithSteps(4000002);
        });

        it('should rotate a rectangular array 270 degrees and 270-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [ 1,  2,  3],
                    [ 6,  7,  8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).getData()).to.deep.equal([
                    [ 3, 8,12,17,22],
                    [ 2, 7,11,16,21],
                    [ 1, 6,10,15,20],
                ]);
                expect(g.columns()).to.equal(5);
                expect(g.rows()).to.equal(3);
            }
            checkWithSteps(3);
            checkWithSteps(-1);
            checkWithSteps(-5);
            checkWithSteps(-9);
            checkWithSteps(7);
            checkWithSteps(11);
            checkWithSteps(4000003);
        });

        it('should not rotate on 360 degrees and 360-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [ 1,  2,  3],
                    [ 6,  7,  8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).getData()).to.deep.equal([
                    [ 1,  2,  3],
                    [ 6,  7,  8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ]);
                expect(g.columns()).to.equal(3);
                expect(g.rows()).to.equal(5);
            }
            checkWithSteps(0);
            checkWithSteps(-4);
            checkWithSteps(-8);
            checkWithSteps(-12);
            checkWithSteps(4);
            checkWithSteps(8);
            checkWithSteps(4000000);
        });

        it('should throw an error if the provided steps are invalid', () => {
            const data = [
                [ 1,  2,  3],
                [ 6,  7,  8],
                [10, 11, 12],
                [15, 16, 17],
                [20, 21, 22],
            ];
            expect(() => gridl(data).rotate('balderdash')).to.throw(
                'Trying to rotate the grid with an invalid steps parameter. Given: balderdash'
            );
        });

        it('should return the api', () => {
            const data = [
                [1,2],
                [3,4],
            ];
            checkApi(gridl(data).rotate(1));
        });

    });

    describe('mirrorX', () => {

        it('should mirror my grid on the x-axis', () => {
            const data = [
                [ 1, 2, 3],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [10,11,12],
                [13,14,15],
            ];
            expect(gridl(data).mirrorX().getData()).to.deep.equal([
                [13,14,15],
                [10,11,12],
                [ 7, 8, 9],
                [ 4, 5, 6],
                [ 1, 2, 3],
            ]);
        });

        it('should mirror my grid on the x-axis at a certain y-position', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).mirrorX(3).getData()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at the very top', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).mirrorX(0).getData()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at the very bottom', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).mirrorX(4).getData()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at an index outside at the top', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).mirrorX(-1).getData()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at an index outside at the bottom', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).mirrorX(5).getData()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [ 1, 2],
                [ 4, 5],
            ];
            checkApi(gridl(data).mirrorX());
        });

    });

    describe('mirrorY', () => {

        it('should mirror my grid on the y-axis', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).mirrorY().getData()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at a certain x-position', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).mirrorY(3).getData()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at the very left', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).mirrorY(0).getData()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at the very right', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).mirrorY(4).getData()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at an index outside at the left', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).mirrorY(-1).getData()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at an index outside at the right', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).mirrorY(5).getData()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [ 1, 2],
                [ 4, 5],
            ];
            checkApi(gridl(data).mirrorY());
        });
    });

    describe('examples', () => {

        it('should get a value at a certain position', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const valueAtPosition = gridl(data).getValueAt([1, 2]);
            expect(valueAtPosition).to.equal(8);
        });

        it('should set value at position', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const newGrid = gridl(data).setValueAt([1, 2], 'Hi').getData();
            expect(newGrid).to.deep.equal([
                [1, 2, 3],
                [4, 5, 6],
                [7, 'Hi', 9],
            ]);
        });

        it('should generate a gridl instance', () => {
            // create a gridl instance
            const columns = 4;
            const rows = 3;
            const grid = gridl.generate(columns, rows, ({ column, row }) => `${column},${row}`);

            // perform gridl operations
            expect(grid.setValueAt([2,1], 'bam').getData()).to.deep.equal([
                ['0,0', '1,0', '2,0', '3,0'],
                ['0,1', '1,1', 'bam', '3,1'],
                ['0,2', '1,2', '2,2', '3,2'],
            ]);
        });

    });

});
