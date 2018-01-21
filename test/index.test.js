import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl, { index2pos, pos2index, toArray2D, toArray1D } from '../src';

const checkApi = api => {
    expect(api).to.have.property('columns');
    expect(api).to.have.property('rows');
    expect(api).to.have.property('size');
    expect(api).to.have.property('index2pos');
    expect(api).to.have.property('pos2index');
    expect(api).to.have.property('toArray1D');
    expect(api).to.have.property('toArray2D');
    expect(api).to.have.property('serialize');
};

describe('index', () => {

    describe('helpers', () => {

        describe('index2pos', () => {

            it('should convert to [NaN, NaN] in a 0-column-array', () => {
                const pos = index2pos(0, 0);
                expect(pos).to.deep.equal([NaN, NaN]);
            });

            it('should convert to [0, 0] in a 32-column-array', () => {
                const pos = index2pos(0, 32);
                expect(pos).to.deep.equal([0, 0]);
            });

            it('should covert to [5, 1] in a 6-columns-array', () => {
                const pos = index2pos(11, 6);
                expect(pos).to.deep.equal([5, 1]);
            });

            it('should covert to [3, 3] in a 4-columns-array', () => {
                const pos = index2pos(15, 4);
                expect(pos).to.deep.equal([3, 3]);
            });

        });

        describe('pos2index', () => {

            it('should convert [0, 0] to 0 in all grids', () => {
                expect(pos2index([0, 0], 0)).to.equal(0);
                expect(pos2index([0, 0], 1)).to.equal(0);
                expect(pos2index([0, 0], 2)).to.equal(0);
                expect(pos2index([0, 0], 3)).to.equal(0);
                expect(pos2index([0, 0], 4)).to.equal(0);
                expect(pos2index([0, 0], 997)).to.equal(0);
                expect(pos2index([0, 0], 9999)).to.equal(0);
                expect(pos2index([0, 0], 99999)).to.equal(0);
                expect(pos2index([0, 0], 999999)).to.equal(0);
            });

            it('should convert [4, 0] to 4 in 5-column-grid', () => {
                expect(pos2index([4, 0], 5)).to.equal(4);
            });

            it('should convert [0, 1] to 8 in 7-column-grid', () => {
                expect(pos2index([0, 1], 7)).to.equal(7);
            });

            it('should convert [0, 2] to 14 in 7-column-grid', () => {
                expect(pos2index([0, 2], 7)).to.equal(14);
            });

            it('should convert [6, 1] to 13 in 7-column-grid', () => {
                expect(pos2index([6, 1], 7)).to.equal(13);
            });

        });

        describe('toArray1D', () => {

            it('should convert a [1, 5] array into an one-dimension array', () => {
                expect(toArray1D([
                    [1,2,3,0,'0999'],
                ], 5, 1)).to.deep.equal(
                    [1,2,3,0,'0999']
                );
            });

            it('should convert a [2, 3] array into an one-dimension array', () => {
                expect(toArray1D([
                    [1,2,3],
                    [4,5,6],
                ], 3, 2)).to.deep.equal(
                    [1,2,3,4,5,6]
                );
            });

            it('should convert a [6, 2] array into an one-dimension array', () => {
                expect(toArray1D([
                    [1,2],
                    [4,5],
                    [2,5],
                    [4,8],
                    [4,'#asd'],
                    ['!?',9],
                ], 2, 6)).to.deep.equal(
                    [1,2,4,5,2,5,4,8,4,'#asd','!?',9]
                );
            });

        });

        describe('toArray2D', () => {

            it('should convert an array with length of 9 into a [2,2] grid', () => {
                expect(toArray2D(
                    [1,2,3,4,5,6,7,8,9],
                    3
                )).to.deep.equal([
                    [1,2,3],
                    [4,5,6],
                    [7,8,9],
                ]);
            });

            it('should not fill up missing values', () => {
                expect(toArray2D(
                    [1,'aaa',3,4,5,6,7,8,9,'10%',11],
                    5
                )).to.deep.equal([
                    [1,'aaa',3,4,5],
                    [6,7,8,9,'10%'],
                    [11],
                ]);
            });

        });

    });

    describe('gridl', () => {

        describe('api', () => {

            it('should return the expected api', () => {
                const data = [];
                const opts = {};
                checkApi(gridl(data, opts));
            });

        });

        describe('validation', () => {

            it('should throw an error if data is not an array', () => {
                expect(() => gridl('dsfsdf', {})).to.throw();
                expect(() => gridl(undefined, {})).to.throw();
                expect(() => gridl(null, {})).to.throw();
                expect(() => gridl({}, {})).to.throw();
                expect(() => gridl([], {})).to.not.throw();
            });

            it('should throw an error if the arrayType is invalid', () => {
                expect(() => gridl([], { arrayType: '???' })).to.throw();
                expect(() => gridl([], { arrayType: 12 })).to.throw();
            });

            it('should work without defining an arrayType', () => {
                expect(() => gridl([], {})).to.not.throw();
            });

        });

        describe('import 1d', () => {

            describe('export 1d', () => {

                it('should export with arrayType given', () => {
                    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    const opts = { arrayType: '1d' };
                    const g = gridl(data, opts);
                    expect(g.toArray1D()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                });

                it('should export without arrayType given', () => {
                    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    const opts = {};
                    const g = gridl(data, opts);
                    expect(g.toArray1D()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                });

            });

            describe('export 2d', () => {

                it('should guess columns and rows and export a 2d array with all entries as columns', () => {
                    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    const opts = {};
                    const g = gridl(data, opts);
                    expect(g.toArray2D()).to.deep.equal([
                        [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    ]);
                });

                it('should guess the rows without arrayType but 3 columns and export a 2d array', () => {
                    const data = [1,2,3,4,5,6,7,8,9,10,11,12];
                    const opts = { columns: 3 };
                    const g = gridl(data, opts);
                    expect(g.toArray2D()).to.deep.equal([
                        [1,2,3],
                        [4,5,6],
                        [7,8,9],
                        [10,11,12],
                    ]);
                    expect(g.columns()).to.equal(3);
                    expect(g.rows()).to.equal(4);
                });

                it('should guess the columns without arrayType but 2 rows and export a 2d array', () => {
                    const data = [1,2,3,4,5,6,7,8];
                    const opts = { rows: 2 };
                    const g = gridl(data, opts);
                    expect(g.toArray2D()).to.deep.equal([
                        [1,2,3,4],
                        [5,6,7,8],
                    ]);
                    expect(g.columns()).to.equal(4);
                    expect(g.rows()).to.equal(2);
                });

                it('should import without arrayType and export array2D with 3 columns and 3 rows', () => {
                    const data = [1,2,3,4,5,6,7,8,9];
                    const opts = { rows: 3, columns: 3 };
                    const g = gridl(data, opts);
                    expect(g.toArray2D()).to.deep.equal([
                        [1,2,3],
                        [4,5,6],
                        [7,8,9],
                    ]);
                });

            });

            describe('dimensions', () => {

                it('should guess all dimensions with array type given', () => {
                    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    const opts = { arrayType: '1d' };
                    const g = gridl(data, opts);
                    expect(g.rows()).to.equal(1);
                    expect(g.columns()).to.equal(9);
                    expect(g.size()).to.deep.equal([9,1]);
                });

                it('should guess rows without array type', () => {
                    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    const opts = {};
                    const g = gridl(data, opts);
                    expect(g.rows()).to.equal(1);
                });

                it('should guess columns without array type', () => {
                    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    const opts = {};
                    const g = gridl(data, opts);
                    expect(g.columns()).to.equal(9);
                });

            });

        });

        describe('import 2d', () => {

            describe('validation', () => {

                it('should throw no error if the dimensions given are correct', () => {
                    const data = [
                        [1, 2, 3],
                        [4, 5, 6],
                    ];
                    const opts = { arrayType: '2d', rows: 2, columns: 3 };
                    expect(() => gridl(data, opts)).to.not.throw();
                });

                it('should throw no error if the columns are wrong', () => {
                    const data = [
                        [1, 2, 3],
                        [4, 5, 6],
                    ];
                    const opts = { arrayType: '2d', rows: 2, columns: 2 };
                    expect(() => gridl(data, opts)).to.throw();
                });

                it('should throw no error if the rows are wrong', () => {
                    const data = [
                        [1, 2, 3],
                        [4, 5, 6],
                    ];
                    const opts = { arrayType: '2d', rows: 3, columns: 3 };
                    expect(() => gridl(data, opts)).to.throw();
                });

                it('should throw an error if the dimensions do have the same length but rows and columns are swapped', () => {
                    const data = [
                        [1, 2, 3],
                        [4, 5, 6],
                    ];
                    const opts = { arrayType: '2d', rows: 3, columns: 2 };
                    expect(() => gridl(data, opts)).to.throw();
                });

            });

            describe('export 1d', () => {

                it('should export with arrayType given', () => {
                    const data = [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                    ];
                    const opts = { arrayType: '2d' };
                    const g = gridl(data, opts);
                    expect(g.toArray1D()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                });

            });

            describe('export 2d', () => {

                it('should export 2d without dimensions given', () => {
                    const data = [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                    ];
                    const opts = { arrayType: '2d' };
                    const g = gridl(data, opts);
                    expect(g.toArray2D()).to.deep.equal([
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
                    const opts = { arrayType: '2d', rows: 2 };
                    const g = gridl(data, opts);
                    expect(g.toArray2D()).to.deep.equal([
                        [1, 2, 3],
                        [4, 5, 6],
                    ]);
                });

                it('should export 2d with columns only given', () => {
                    const data = [
                        [4, 5, 6],
                        [7, 8, 9],
                    ];
                    const opts = { arrayType: '2d', columns: 3 };
                    const g = gridl(data, opts);
                    expect(g.toArray2D()).to.deep.equal([
                        [4, 5, 6],
                        [7, 8, 9],
                    ]);
                });

            });

        });

        describe('dimensions', () => {

            it('should use default size without options', () => {
                const data = [1,2,3,4,5,6];
                const g = gridl(data);
                expect(g.rows()).to.equal(1);
                expect(g.columns()).to.equal(6);
                expect(g.size()).to.deep.equal([6, 1]);
            });

            it('should get the columns', () => {
                const data = [1,2,3,4,5,6];
                const g = gridl(data, { columns: 2 });
                expect(g.columns()).to.equal(2);
            });

            it('should get the rows', () => {
                const data = [1,2,3,4,5,6];
                const g = gridl(data, { rows: 2 });
                expect(g.rows()).to.equal(2);
            });

            it('should get the size', () => {
                const data = [1,2,3,4,5,6];
                const g = gridl(data, { rows: 2 });
                expect(g.size()).to.deep.equal([3,2]);
            });

        });

        describe('index2pos', () => {

            it('should convert an index to the correct position', () => {
                const data = [
                    [1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.index2pos(0)).to.deep.equal([0, 0]);
                expect(g.index2pos(2)).to.deep.equal([2, 0]);
                expect(g.index2pos(3)).to.deep.equal([3, 0]);
                expect(g.index2pos(4)).to.deep.equal([0, 1]);
                expect(g.index2pos(7)).to.deep.equal([3, 1]);
                expect(g.index2pos(9)).to.deep.equal([1, 2]);
            });

            it('should convert an index to the correct position, even if it\'s out of range', () => {
                const data = [
                    [1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.index2pos(12)).to.deep.equal([0, 3]);
                expect(g.index2pos(15)).to.deep.equal([3, 3]);
                expect(g.index2pos(17)).to.deep.equal([1, 4]);
            });

        });

        describe('pos2index', () => {

            it('should convert a position to the correct index', () => {
                const data = [
                    [1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.pos2index([0, 0])).to.deep.equal(0);
                expect(g.pos2index([2, 0])).to.deep.equal(2);
                expect(g.pos2index([3, 0])).to.deep.equal(3);
                expect(g.pos2index([0, 1])).to.deep.equal(4);
                expect(g.pos2index([3, 1])).to.deep.equal(7);
                expect(g.pos2index([1, 2])).to.deep.equal(9);
            });

            it('should convert a position to the correct index, even if it\'s out of range', () => {
                const data = [
                    [1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.pos2index([0, 3])).to.deep.equal(12);
                expect(g.pos2index([3, 3])).to.deep.equal(15);
                expect(g.pos2index([1, 4])).to.deep.equal(17);
            });

        });

        describe('serialize', () => {

            it('should serialize the data and options', () => {
                const data = [
                    [1,2,3,4],
                    [5,6,7,8],
                    [9,10,11,12],
                ];
                const res = gridl(data, { arrayType: '2d' }).serialize();
                expect(res).to.deep.equal({
                    opts: {
                        arrayType: '2d',
                        rows: 3,
                        columns: 4,
                    },
                    data: [1,2,3,4,5,6,7,8,9,10,11,12],
                });
            });

        });

        describe('valueAt', () => {

            it('should return the value at a certain index', () => {
                const data = [
                    [1,2,3,4],
                    [5,6,7,8],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.valueAt(0)).to.equal(1);
                expect(g.valueAt(2)).to.equal(3);
                expect(g.valueAt(5)).to.equal(6);
                expect(g.valueAt(7)).to.equal(8);
            });

            it('should return the value at a certain position', () => {
                const data = [
                    [1,2,3,4],
                    [5,6,7,8],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.valueAt([0,0])).to.equal(1);
                expect(g.valueAt([1,0])).to.equal(2);
                expect(g.valueAt([0,1])).to.equal(5);
                expect(g.valueAt([2,1])).to.equal(7);
            });

            it('should set the value at a certain index', () => {
                const data = [
                    [1,2],
                    [3,4],
                    [5,6],
                    [7,8],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.valueAt([0,2])).to.equal(5);
                checkApi(g.valueAt([0,2], 666));
                expect(g.valueAt([0,2])).to.equal(666);
            });

            it('should return the api when setting valueAt', () => {
                const data = [
                    [1,2],
                    [3,4],
                    [5,6],
                    [7,8],
                ];
                checkApi(gridl(data, { arrayType: '2d' }).valueAt([0,2], 666));
            });

            it('should return undefined if index or position is invalid', () => {
                const data = [1,2,3,4,5,6,7,8];
                const g = gridl(data, { rows: 2 });
                expect(g.valueAt('wrong')).to.equal(undefined);
                expect(g.valueAt({})).to.equal(undefined);
                expect(g.valueAt([])).to.equal(undefined);
                expect(g.valueAt([-1, 100])).to.equal(undefined);
                expect(g.valueAt()).to.equal(undefined);
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
                const grid = gridl(data, { arrayType: '2d' }).setAreaAt(position, area).toArray2D();
                expect(grid).to.deep.equal([
                    [ 1,  2,  3,  4,  5,  6],
                    [ 7,  8,  9,  4,  1,  8],
                    [13, 14, 15,  5,  3,  9],
                    [19, 20, 21, 22, 23, 24],
                ]);
            });

            it('should set an area at a given index', () => {
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
                const index = 9;
                const grid = gridl(data, { arrayType: '2d' }).setAreaAt(index, area).toArray2D();
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
                const grid = gridl(data, { arrayType: '2d' }).setAreaAt(position, area).toArray2D();
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
                const area = gridl(data, { arrayType: '2d' }).getAreaAt(position, size);
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
                const area = gridl(data, { arrayType: '2d' }).getAreaAt(position, size);
                expect(area).to.deep.equal([[14, 15]]);
            });

        });

        describe('findIndex', () => {

            it('should return the index of the first occurence', () => {
                const data = [
                    [1,2,3],
                    [4,5,5],
                    [6,6,6],
                ];
                const index = gridl(data, { arrayType: '2d' }).findIndex(v => v === 5);
                expect(index).to.equal(4);
            });

            it('should return -1 if the are no findings', () => {
                const data = [
                    [1,2,3],
                    [4,5,5],
                    [6,6,6],
                ];
                const index = gridl(data, { arrayType: '2d' }).findIndex(v => v === 'something else');
                expect(index).to.equal(-1);
            });

        });

        describe('findPosition', () => {

            it('should return the position of the first occurrence', () => {
                const data = [
                    [1,2,3],
                    [4,2,5],
                    [6,5,4],
                ];
                const position = gridl(data, { arrayType: '2d' }).findPosition(v => v === 5);
                expect(position).to.deep.equal([2,1]);
            });

            it('should return -1 if the are no findings', () => {
                const data = [
                    [1,2,3],
                    [4,2,5],
                    [6,6,6],
                ];
                const index = gridl(data, { arrayType: '2d' }).findPosition(v => v === 'something else');
                expect(index).to.equal(undefined);
            });

        });

        describe('findPositionInArea', () => {

            it('should return the position of the first occurrence with a given position', () => {
                const data = [
                    [0,7,3,2,8],
                    [4,2,5,7,8],
                    [6,6,6,6,7],
                ];
                const areaPos = [2,1];
                const areaSize = [3,2];
                const result = gridl(data, { arrayType: '2d' }).findPositionInArea(areaPos, areaSize, v => v === 7);
                expect(result).to.deep.equal([3,1]);
            });

            it('should return the position of the first occurrence with a given index', () => {
                const data = [
                    [0,7,3,2,8],
                    [4,2,5,7,8],
                    [6,6,6,6,7],
                ];
                const areaIndex = 6;
                const areaSize = [3,2];
                const result = gridl(data, { arrayType: '2d' }).findPositionInArea(areaIndex, areaSize, v => v === 7);
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
                const result = gridl(data, { arrayType: '2d' }).findPositionInArea(areaPos, areaSize, v => v === 9);
                expect(result).to.equal(undefined);
            });

        });

        describe('findIndexInArea', () => {

            it('should return the position of the first occurrence with a given position', () => {
                const data = [
                    [0,7,3,2,8],
                    [4,2,5,7,8],
                    [6,6,6,6,7],
                ];
                const areaPos = [2,1];
                const areaSize = [3,2];
                const result = gridl(data, { arrayType: '2d' }).findIndexInArea(areaPos, areaSize, v => v === 7);
                expect(result).to.equal(8);
            });

            it('should return the position of the first occurrence with a given index', () => {
                const data = [
                    [0,7,3,2,8],
                    [4,2,5,7,8],
                    [6,6,6,6,7],
                ];
                const areaIndex = 6;
                const areaSize = [3,2];
                const result = gridl(data, { arrayType: '2d' }).findIndexInArea(areaIndex, areaSize, v => v === 7);
                expect(result).to.equal(8);
            });

            it('should return -1 if the are no findings', () => {
                const data = [
                    [0,7,3,2,8],
                    [4,2,5,7,8],
                    [6,6,6,6,7],
                ];
                const areaPos = [2,1];
                const areaSize = [3,2];
                const result = gridl(data, { arrayType: '2d' }).findIndexInArea(areaPos, areaSize, v => v === 9);
                expect(result).to.equal(-1);
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
                const result = gridl(data, { arrayType: '2d' }).checkAreaFitsAt(areaPos, area);
                expect(result).to.equal(true);
            });

            it('should fit with a given index', () => {
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
                const areaIndex = 13;
                const result = gridl(data, { arrayType: '2d' }).checkAreaFitsAt(areaIndex, area);
                expect(result).to.equal(true);
            });

            it('should not fit with a given index', () => {
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
                const areaIndex = 4;
                const result = gridl(data, { arrayType: '2d' }).checkAreaFitsAt(areaIndex, area);
                expect(result).to.equal(false);
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
                const result = gridl(data, { arrayType: '2d' }).checkAreaFitsAt(areaPos, area);
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
                const result = gridl(data, { arrayType: '2d' }).checkAreaFitsAt(areaPos, area);
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
                const result = gridl(data, { arrayType: '2d' }).checkAreaFitsAt(areaPos, area);
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
                const g = gridl(data, { arrayType: '2d' });
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
                const g = gridl(data, { arrayType: '2d' });
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
                const g = gridl(data, { arrayType: '2d' });
                expect(g.getRelativePosition([0,0], [-1, 0])).to.deep.equal(undefined);
                expect(g.getRelativePosition([0,0], [ 0,-1])).to.deep.equal(undefined);
                expect(g.getRelativePosition([0,0], [ 5, 5])).to.deep.equal(undefined);
                expect(g.getRelativePosition([3,2], [ 2, 0])).to.deep.equal(undefined);
                expect(g.getRelativePosition([3,2], [ 0, 3])).to.deep.equal(undefined);
            });

        });

        describe('getRelativeIndex', () => {

            it('should get me the index relative to my start position', () => {
                const data = [
                    [ 1, 2, 3, 4,21],
                    [ 5, 6, 7, 8,22],
                    [ 9,10,11,12,23],
                    [13,14,15,16,24],
                    [17,18,19,20,25],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.getRelativeIndex([2,3], [-2, 1])).to.equal(20);
                expect(g.getRelativeIndex([0,0], [ 1, 0])).to.equal(1);
                expect(g.getRelativeIndex([0,0], [ 4, 0])).to.equal(4);
                expect(g.getRelativeIndex([1,1], [-1,-1])).to.equal(0);
                expect(g.getRelativeIndex([2,1], [ 2, 3])).to.equal(24);
            });

            it('should get me -1 for positions out of scope', () => {
                const data = [
                    [ 1, 2, 3, 4,21],
                    [ 5, 6, 7, 8,22],
                    [ 9,10,11,12,23],
                    [13,14,15,16,24],
                    [17,18,19,20,25],
                ];
                const g = gridl(data, { arrayType: '2d' });
                expect(g.getRelativeIndex([0,0], [-1, 0])).to.deep.equal(-1);
                expect(g.getRelativeIndex([0,0], [ 0,-1])).to.deep.equal(-1);
                expect(g.getRelativeIndex([0,0], [ 5, 5])).to.deep.equal(-1);
                expect(g.getRelativeIndex([3,2], [ 2, 0])).to.deep.equal(-1);
                expect(g.getRelativeIndex([3,2], [ 0, 3])).to.deep.equal(-1);
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
                const g = gridl(data, { arrayType: '2d' });
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
                const g = gridl(data, { arrayType: '2d' });
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
                const g = gridl(data, { arrayType: '2d' });
                expect(g.getRelativeValue([0,0], [-1, 0])).to.deep.equal(undefined);
                expect(g.getRelativeValue([0,0], [ 0,-1])).to.deep.equal(undefined);
                expect(g.getRelativeValue([0,0], [ 5, 5])).to.deep.equal(undefined);
                expect(g.getRelativeValue([3,2], [ 2, 0])).to.deep.equal(undefined);
                expect(g.getRelativeValue([3,2], [ 0, 3])).to.deep.equal(undefined);
            });


        });

        describe('examples', () => {

            it('should convert a one-dimensional array into a two-dimensional grid (only rows given)', () => {
                const data = [5, 6, 4, 2, 3, 20];
                const array2D = gridl(data, { rows: 2 }).toArray2D();
                expect(array2D).to.deep.equal([
                    [5, 6, 4],
                    [2, 3, 20],
                ]);
            });

            it('should convert a one-dimensional array into a two-dimensional grid (only columns given)', () => {
                const data = [1, 2, 3, 4, 5, 6, 7, 8];
                const array2D = gridl(data, { columns: 2 }).toArray2D();
                expect(array2D).to.deep.equal([
                    [1, 2],
                    [3, 4],
                    [5, 6],
                    [7, 8],
                ]);
            });

            it('should flatten a two-dimensional grid into a one-dimensional array', () => {
                const data = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                ];
                const array1D = gridl(data, { arrayType: '2d' }).toArray1D();
                expect(array1D).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });

            it('should get a value at a certain position or index', () => {
                const data = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                ];

                const valueAtPosition = gridl(data, { arrayType: '2d' }).valueAt([1, 2]);
                expect(valueAtPosition).to.equal(8);

                const valueAtIndex = gridl(data, { arrayType: '2d' }).valueAt(4);
                expect(valueAtIndex).to.equal(5);
            });

            it('should set value at position', () => {
                const data = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                ];
                const newGrid = gridl(data, { arrayType: '2d' }).valueAt([1, 2], 'Hi').toArray2D();
                expect(newGrid).to.deep.equal([
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 'Hi', 9],
                ]);
            });

        });

    });

});
