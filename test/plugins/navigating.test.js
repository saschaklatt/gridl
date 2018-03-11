import { describe, it } from 'mocha';
import gridl from '../../src';
import { expect } from 'chai';
import { checkApi } from '../testUtils';

describe('navigating', () => {

    describe('goto', () => {

        it('should provide the api', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            checkApi(gridl(data).goto([0,0]));
        });

        it('should change the position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).goto([2,1]).position()).to.deep.equal([2,1]);
        });

        it('should make a copy of the position, not use a reference', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            const pos = [2,1];
            const g = gridl(data);
            g.goto(pos);
            pos[0] = 0;
            pos[1] = 0;
            expect(g.position()).to.deep.equal([2,1]);
        });

        it('should throw an error if you provide an invalid position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(() => gridl(data).goto(0)).to.throw('Trying to go to an invalid position. Given: 0');
            expect(() => gridl(data).goto('balderdash')).to.throw('Trying to go to an invalid position. Given: balderdash');
            expect(() => gridl(data).goto({})).to.throw('Trying to go to an invalid position. Given: [object Object]');
            expect(() => gridl(data).goto([2,1,3,4,1])).to.throw('Trying to go to an invalid position. Given: 2,1,3,4,1');
        });

        it('should go to a position outside the grid (left)', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).goto([-1,0]).position()).to.deep.equal([-1,0]);
        });

        it('should go to a position outside the grid (top)', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).goto([0,-1]).position()).to.deep.equal([0,-1]);
        });

        it('should go to a position outside the grid (right)', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).goto([3,0]).position()).to.deep.equal([3,0]);
        });

        it('should go to a position outside the grid (bottom)', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).goto([0,2]).position()).to.deep.equal([0,2]);
        });

    });

    describe('position', () => {

        it('should return the initial position of [0,0]', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).goto([0,0]).position()).to.deep.equal([0,0]);
        });

        it('should change the position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).goto([2,1]).position()).to.deep.equal([2,1]);
        });

        it('should return a copy, not a reference of the internal position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            const g = gridl(data);
            const pos = g.goto([2,1]).position();
            pos[0] = 0;
            pos[1] = 0;
            expect(g.position()).to.deep.equal([2,1]);
        });

    });

    describe('walk', () => {

        it('should walk to a position relative to the default position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            const direction = [2,1];
            expect(gridl(data).walk(direction).position()).to.deep.equal([2,1]);
        });

        it('should walk to a position relative to an arbitrary position', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
            ];
            const position = [3,1];
            const direction = [-2,1];
            const newPosition = gridl(data)
                .goto(position)
                .walk(direction)
                .position();
            expect(newPosition).to.deep.equal([1,2]);
        });

        it('should not throw an error if you walk to a position outside the grid', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [4,5,6],
            ];
            const g = gridl(data).goto([1,1]);
            expect(() => g.walk([0,-2])).to.not.throw();
        });

        it('should throw an error if you walk into an invalid direction', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [4,5,6],
            ];
            const g = gridl(data).goto([1,1]);
            expect(() => g.walk()).to.throw('Trying to walk into an invalid direction. Given: undefined');
            expect(() => g.walk('up')).to.throw('Trying to walk into an invalid direction. Given: up');
            expect(() => g.walk({ '0': 1, '1': 1 })).to.throw('Trying to walk into an invalid direction. Given: [object Object]');
            expect(() => g.walk([1,2,3,4])).to.throw('Trying to walk into an invalid direction. Given: 1,2,3,4');
        });

    });

});