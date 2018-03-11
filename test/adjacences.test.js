import { describe, it } from 'mocha';
import { expect } from 'chai';
import { adjacences } from '../src';

describe('adjacences', () => {

    it('should be immutable', () => {
        expect(() => adjacences.test = 'test').to.throw();
    });

    describe('ALL', () => {

        it('should return all direct neighbours in the order: left -> right / top -> down', () => {
            expect(adjacences.ALL).to.deep.equal([[-1,-1], [0,-1], [1,-1], [-1,0], [1,0], [-1,1], [0,1], [1,1]]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.ALL[0] = 'test').to.throw();
        });

    });

    describe('ALL_CW', () => {

        it('should return all direct neighbours in clockwise order', () => {
            expect(adjacences.ALL_CW).to.deep.equal([
                [0,-1],
                [1,-1],
                [1,0],
                [1,1],
                [0,1],
                [-1,1],
                [-1,0],
                [-1,-1],
            ]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.ALL_CW[0] = 'test').to.throw();
        });

    });

    describe('ALL_CCW', () => {

        it('should return all direct neighbours in counterclockwise order', () => {
            expect(adjacences.ALL_CCW).to.deep.equal([
                [0,-1],
                [-1,-1],
                [-1,0],
                [-1,1],
                [0,1],
                [1,1],
                [1,0],
                [1,-1],
            ]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.ALL_CCW[0] = 'test').to.throw();
        });

    });

    describe('ORTHOGONAL', () => {

        it('should return all orthogonal direct neighbours in the order: left -> right / top -> bottom', () => {
            expect(adjacences.ORTHOGONAL).to.deep.equal([[0,-1], [-1,0], [1,0], [0,1]]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.ORTHOGONAL[0] = 'test').to.throw();
        });

    });

    describe('ORTHOGONAL_CW', () => {

        it('should return all orthogonal direct neighbours in clockwise order', () => {
            expect(adjacences.ORTHOGONAL_CW).to.deep.equal([[0,-1], [1,0], [0,1], [-1,0]]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.ORTHOGONAL_CW[0] = 'test').to.throw();
        });

    });

    describe('ORTHOGONAL_CCW', () => {

        it('should return all orthogonal direct neighbours in counterclockwise order', () => {
            expect(adjacences.ORTHOGONAL_CCW).to.deep.equal([[0,-1], [-1,0], [0,1], [1,0]]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.ORTHOGONAL_CCW[0] = 'test').to.throw();
        });

    });

    describe('DIAGONAL', () => {

        it('should return all diagonal direct neighbours in the order: left -> right / top -> down', () => {
            expect(adjacences.DIAGONAL).to.deep.equal([[-1,-1], [1,-1], [-1,1], [1,1]]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.DIAGONAL[0] = 'test').to.throw();
        });

    });

    describe('DIAGONAL_CW', () => {

        it('should return all diagonal direct neighbours in clockwise order', () => {
            expect(adjacences.DIAGONAL_CW).to.deep.equal([[1,-1], [1,1], [-1,1], [-1,-1]]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.DIAGONAL_CW[0] = 'test').to.throw();
        });

    });

    describe('DIAGONAL_CCW', () => {

        it('should return all diagonal direct neighbours in counterclockwise order', () => {
            expect(adjacences.DIAGONAL_CCW).to.deep.equal([[-1,-1], [-1,1], [1,1], [1,-1]]);
        });

        it('should be immutable', () => {
            expect(() => adjacences.DIAGONAL_CCW[0] = 'test').to.throw();
        });

    });

});
