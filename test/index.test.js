import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../src';

const checkApi = api => {
    // TODO: make sure it exposes no additional properties
    expect(api).to.have.property('columns');
    expect(api).to.have.property('rows');
    expect(api).to.have.property('size');
    expect(api).to.have.property('getValueAt');
    expect(api).to.have.property('setValueAt');
    expect(api).to.have.property('setAreaAt');
    expect(api).to.have.property('getAreaAt');
    expect(api).to.have.property('findPosition');
    expect(api).to.have.property('findPositionInArea');
    expect(api).to.have.property('checkAreaFitsAt');
    expect(api).to.have.property('getRelativePosition');
    expect(api).to.have.property('getRelativeValue');
    expect(api).to.have.property('getData');
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

    });

});
