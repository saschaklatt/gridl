import { describe, it } from 'mocha';
import { expect } from 'chai';
import { directions } from '../src';

describe('directions', () => {

    it('should be immutable', () => {
        expect(() => directions.test = 'test').to.throw();
    });

    describe('UP', () => {

        it('should return the expected direction', () => {
            expect(directions.UP).to.deep.equal([0,-1]);
        });

        it('should be immutable', () => {
            expect(() => directions.UP[0] = 2).to.throw();
        });

    });

    describe('UP_RIGHT', () => {

        it('should return the expected direction', () => {
            expect(directions.UP_RIGHT).to.deep.equal([1,-1]);
        });

        it('should be immutable', () => {
            expect(() => directions.UP_RIGHT[0] = 666).to.throw();
        });

    });

    describe('UP_RIGHT', () => {

        it('should return the expected direction', () => {
            expect(directions.RIGHT).to.deep.equal([1,0]);
        });

        it('should be immutable', () => {
            expect(() => directions.RIGHT[0] = 666).to.throw();
        });

    });

    describe('DOWN_RIGHT', () => {

        it('should return the expected direction', () => {
            expect(directions.DOWN_RIGHT).to.deep.equal([1,1]);
        });

        it('should be immutable', () => {
            expect(() => directions.DOWN_RIGHT[0] = 666).to.throw();
        });

    });

    describe('DOWN', () => {

        it('should return the expected direction', () => {
            expect(directions.DOWN).to.deep.equal([0,1]);
        });

        it('should be immutable', () => {
            expect(() => directions.DOWN[0] = 666).to.throw();
        });

    });

    describe('DOWN_LEFT', () => {

        it('should return the expected direction', () => {
            expect(directions.DOWN_LEFT).to.deep.equal([-1,1]);
        });

        it('should be immutable', () => {
            expect(() => directions.DOWN_LEFT[0] = 666).to.throw();
        });

    });

    describe('LEFT', () => {

        it('should return the expected direction', () => {
            expect(directions.LEFT).to.deep.equal([-1,0]);
        });

        it('should be immutable', () => {
            expect(() => directions.LEFT[0] = 666).to.throw();
        });

    });

    describe('UP_LEFT', () => {

        it('should return the expected direction', () => {
            expect(directions.UP_LEFT).to.deep.equal([-1,-1]);
        });

        it('should be immutable', () => {
            expect(() => directions.UP_LEFT[0] = 666).to.throw();
        });

    });

});
