import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';
import { checkApi } from '../testUtils';

describe('rotating', () => {

    describe('rotate', () => {

        it('should rotate a square array 90 degrees clockwise', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 7, 8, 9],
                [10,11,12,13,14],
                [15,16,17,18,19],
                [20,21,22,23,24],
            ];
            expect(gridl(data).rotate(1).data()).to.deep.equal([
                [20,15,10, 6, 1],
                [21,16,11, 7, 2],
                [22,17,12, 7, 3],
                [23,18,13, 8, 4],
                [24,19,14, 9, 5],
            ]);
        });

        it('should rotate a rectangular array 90 degrees and 90-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [ 1, 2, 3],
                    [ 6, 7, 7],
                    [10,11,12],
                    [15,16,17],
                    [20,21,22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).data()).to.deep.equal([
                    [20,15,10, 6, 1],
                    [21,16,11, 7, 2],
                    [22,17,12, 7, 3],
                ]);
                expect(g.numColumns()).to.equal(5);
                expect(g.numRows()).to.equal(3);
            }
            checkWithSteps(1);
            checkWithSteps(-3);
            checkWithSteps(-7);
            checkWithSteps(5);
            checkWithSteps(9);
            checkWithSteps(13);
            checkWithSteps(4000001);
        });

        it('should rotate a rectangular array 180 degrees and 180-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [ 1,  2,  3],
                    [ 6,  7,  8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).data()).to.deep.equal([
                    [22, 21, 20],
                    [17, 16, 15],
                    [12, 11, 10],
                    [ 8,  7,  6],
                    [ 3,  2,  1],
                ]);
                expect(g.numColumns()).to.equal(3);
                expect(g.numRows()).to.equal(5);
            }
            checkWithSteps(2);
            checkWithSteps(-2);
            checkWithSteps(-6);
            checkWithSteps(6);
            checkWithSteps(10);
            checkWithSteps(4000002);
        });

        it('should rotate a rectangular array 270 degrees and 270-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [ 1,  2,  3],
                    [ 6,  7,  8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).data()).to.deep.equal([
                    [ 3, 8,12,17,22],
                    [ 2, 7,11,16,21],
                    [ 1, 6,10,15,20],
                ]);
                expect(g.numColumns()).to.equal(5);
                expect(g.numRows()).to.equal(3);
            }
            checkWithSteps(3);
            checkWithSteps(-1);
            checkWithSteps(-5);
            checkWithSteps(-9);
            checkWithSteps(7);
            checkWithSteps(11);
            checkWithSteps(4000003);
        });

        it('should not rotate on 360 degrees and 360-degrees-variations', () => {
            function checkWithSteps(steps) {
                const data = [
                    [ 1,  2,  3],
                    [ 6,  7,  8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ];
                const g = gridl(data);
                expect(g.rotate(steps).data()).to.deep.equal([
                    [ 1,  2,  3],
                    [ 6,  7,  8],
                    [10, 11, 12],
                    [15, 16, 17],
                    [20, 21, 22],
                ]);
                expect(g.numColumns()).to.equal(3);
                expect(g.numRows()).to.equal(5);
            }
            checkWithSteps(0);
            checkWithSteps(-4);
            checkWithSteps(-8);
            checkWithSteps(-12);
            checkWithSteps(4);
            checkWithSteps(8);
            checkWithSteps(4000000);
        });

        it('should throw an error if the provided steps are invalid', () => {
            const data = [
                [ 1,  2,  3],
                [ 6,  7,  8],
                [10, 11, 12],
                [15, 16, 17],
                [20, 21, 22],
            ];
            expect(() => gridl(data).rotate('balderdash')).to.throw(
                'Trying to rotate the grid with an invalid steps parameter. Given: balderdash'
            );
        });

        it('should return the api', () => {
            const data = [
                [1,2],
                [3,4],
            ];
            checkApi(gridl(data).rotate(1));
        });

    });

});
