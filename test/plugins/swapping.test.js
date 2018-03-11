import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';
import { checkApi } from '../testUtils';

describe('swapping', () => {

    describe('swapCells', () => {

        it('should swap to two cells', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            expect(gridl(data).swapCells([0,0], [2,1]).data()).to.deep.equal([
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
            expect(gridl(data).swapRows(1,3).data()).to.deep.equal([
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
            expect(gridl(data).swapColumns(1,3).data()).to.deep.equal([
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

});