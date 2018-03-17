import { describe, it } from 'mocha';
import gridl from '../../src';
import { expect } from 'chai';

describe('finding', () => {

    describe('find', () => {

        it('should return the position of the first occurrence by using a fixed value', () => {
            const data = [
                [1,2,3],
                [4,2,5],
                [6,5,4],
            ];
            const position = gridl(data).find(5);
            expect(position).to.deep.equal([2,1]);
        });

        it('should return the position of the first occurrence by using a callback function', () => {
            const data = [
                [1,2,3],
                [4,2,5],
                [6,5,4],
            ];
            const position = gridl(data).find(v => v === 5);
            expect(position).to.deep.equal([2,1]);
        });

        it('should return -1 if the are no findings', () => {
            const data = [
                [1,2,3],
                [4,2,5],
                [6,6,6],
            ];
            const index = gridl(data).find(v => v === 'something else');
            expect(index).to.equal(undefined);
        });

    });

});