import { expect } from 'chai';
import { index2pos, pos2index, toArray2D, toArray1D } from '../src';

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
            ])).to.deep.equal(
                [1,2,3,0,'0999']
            );
        });

        it('should convert a [2, 3] array into an one-dimension array', () => {
            expect(toArray1D([
                [1,2,3],
                [4,5,6],
            ])).to.deep.equal(
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
            ])).to.deep.equal(
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
