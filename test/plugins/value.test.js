import { describe, it } from 'mocha';
import gridl from '../../src';
import { expect } from 'chai';
import { checkApi } from '../testUtils';

describe('value', () => {

    describe('valueAt (as getter)', () => {

        const mockData = () => [
            [1,2,3,4],
            [5,6,7,8],
        ];

        it('should return the value at a certain position', () => {
            const g = gridl(mockData());
            expect(g.valueAt([0,0])).to.equal(1);
            expect(g.valueAt([1,0])).to.equal(2);
            expect(g.valueAt([0,1])).to.equal(5);
            expect(g.valueAt([2,1])).to.equal(7);
        });

        it('should return undefined if the position is invalid', () => {
            const g = gridl(mockData());
            const msgBase = 'Trying to access value at an invalid position: ';
            expect(() => g.valueAt('wrong')).to.throw(msgBase + 'wrong');
            expect(() => g.valueAt({})).to.throw(msgBase + '[object Object]');
            expect(() => g.valueAt([])).to.throw(msgBase);
            expect(() => g.valueAt()).to.throw(msgBase + 'undefined');
        });

        it('should return undefined if the position is outside the grid', () => {
            expect(gridl(mockData()).valueAt([-1, 100])).to.equal(undefined);
        });

    });

    describe('valueAt (as setter)', () => {

        const mockData = () => ([
            [1,2],
            [3,4],
            [5,6],
            [7,8],
        ]);

        it('should set a number value at a certain position', () => {
            const g = gridl(mockData());
            expect(g.valueAt([0,2])).to.equal(5);
            checkApi(g.valueAt([0,2], 666));
            expect(g.valueAt([0,2])).to.equal(666);
        });

        it('should set a string value at a certain position', () => {
            const g = gridl(mockData());
            expect(g.valueAt([0,2])).to.equal(5);
            expect(g.valueAt([0,2])).to.equal(5);
        });

        it('should do nothing if you set a value outside the grid', () => {
            expect(gridl(mockData()).valueAt([3,2], 'balderdash').data()).to.deep.equal(mockData());
        });

        it('should return the api', () => {
            checkApi(gridl(mockData()).valueAt([0,2], 666));
        });

        it('should set undefined value at a certain position', () => {
            expect(gridl(mockData()).valueAt([0,2], undefined).data()).to.deep.equal([
                [1,2],
                [3,4],
                [undefined,6],
                [7,8],
            ]);
        });

        it('should throw an error when using an invalid position', () => {
            const pos = 'balderdash';
            const errorMsg = `Trying to access value at an invalid position: ${pos}`;
            expect(() => gridl(mockData()).valueAt(pos, 666)).to.throw(errorMsg);
        });

    });

});
