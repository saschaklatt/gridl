import { describe, it } from 'mocha';
import gridl from '../../src';
import { expect } from 'chai';
import { checkApi } from '../testUtils';

describe('clipping', () => {

    describe('clipAt', () => {

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
            expect(g.clipAt(position, size).data()).to.deep.equal([
                [15,16,17],
                [25,26,27],
            ]);
            expect(g.numColumns()).to.equal(3);
            expect(g.numRows()).to.equal(2);
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
            expect(g.clipAt(position, size).data()).to.deep.equal([
                [ 1, 2],
                [11,12],
                [21,22],
                [31,32],
            ]);
            expect(g.numColumns()).to.equal(2);
            expect(g.numRows()).to.equal(4);
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
            expect(g.clipAt(position, size).data()).to.deep.equal([
                [29,30],
                [39,40],
                [49,50],
                [59,60],
            ]);
            expect(g.numColumns()).to.equal(2);
            expect(g.numRows()).to.equal(4);
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
            expect(gridl(data).clipAt(position, size).data()).to.deep.equal([
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
            checkApi(gridl(data).clipAt([1,1], [3,5]));
        });

        it('should throw an error if the position is invalid', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 6, 7, 8, 9],
                [11,12,13,14],
            ];
            const size = [2,2];
            expect(() => gridl(data).clipAt([-1, 0], size)).to.throw('Trying to clip data at an invalid position. Given: -1,0');
            expect(() => gridl(data).clipAt([ 0,-1], size)).to.throw('Trying to clip data at an invalid position. Given: 0,-1');
            expect(() => gridl(data).clipAt([ 4, 1], size)).to.throw('Trying to clip data at an invalid position. Given: 4,1');
            expect(() => gridl(data).clipAt([ 2, 3], size)).to.throw('Trying to clip data at an invalid position. Given: 2,3');
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
            expect(g.goto(position).clip(size).data()).to.deep.equal([
                [15,16,17],
                [25,26,27],
            ]);
            expect(g.numColumns()).to.equal(3);
            expect(g.numRows()).to.equal(2);
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
            expect(g.goto(position).clip(size).data()).to.deep.equal([
                [ 1, 2],
                [11,12],
                [21,22],
                [31,32],
            ]);
            expect(g.numColumns()).to.equal(2);
            expect(g.numRows()).to.equal(4);
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
            expect(g.goto(position).clip(size).data()).to.deep.equal([
                [29,30],
                [39,40],
                [49,50],
                [59,60],
            ]);
            expect(g.numColumns()).to.equal(2);
            expect(g.numRows()).to.equal(4);
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
            expect(gridl(data).goto(position).clip(size).data()).to.deep.equal([
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
            checkApi(gridl(data).goto([1,1]).clip([3,5]));
        });

    });

});