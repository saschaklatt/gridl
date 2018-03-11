import { describe, it } from 'mocha';
import gridl from '../../src';
import { expect } from 'chai';
import { checkApi } from '../testUtils';

describe('value', () => {

    describe('valueAt (as getter)', () => {

        it('should return the value at a certain position', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            const g = gridl(data);
            expect(g.valueAt([0,0])).to.equal(1);
            expect(g.valueAt([1,0])).to.equal(2);
            expect(g.valueAt([0,1])).to.equal(5);
            expect(g.valueAt([2,1])).to.equal(7);
        });

        it('should return undefined if the position is invalid', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            const g = gridl(data);
            expect(g.valueAt('wrong')).to.equal(undefined);
            expect(g.valueAt({})).to.equal(undefined);
            expect(g.valueAt([])).to.equal(undefined);
            expect(g.valueAt()).to.equal(undefined);
        });

        it('should return undefined if the position is outside the grid', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            expect(gridl(data).valueAt([-1, 100])).to.equal(undefined);
        });

    });

    describe('valueAt (as setter)', () => {

        it('should set a number value at a certain position', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            const g = gridl(data);
            expect(g.valueAt([0,2])).to.equal(5);
            checkApi(g.valueAt([0,2], 666));
            expect(g.valueAt([0,2])).to.equal(666);
        });

        it('should set a string value at a certain position', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            const g = gridl(data);
            expect(g.valueAt([0,2])).to.equal(5);
            checkApi(g.valueAt('ludicrous', 666));
            expect(g.valueAt([0,2])).to.equal(5);
        });

        it('should do nothing if you set a value outside the grid', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            expect(gridl(data).valueAt([3,2], 'balderdash').data()).to.deep.equal([
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            checkApi(gridl(data).valueAt([0,2], 666));
        });

        it('should set undefined value at a certain position', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
                [7,8],
            ];
            expect(gridl(data).valueAt([0,2], undefined).data()).to.deep.equal([
                [1,2],
                [3,4],
                [undefined,6],
                [7,8],
            ]);
        });

    });

});
