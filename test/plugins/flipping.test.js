import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';
import { checkApi } from '../testUtils';

describe('flipping', () => {

    describe('flipX', () => {

        it('should mirror my grid on the x-axis', () => {
            const data = [
                [ 1, 2, 3],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [10,11,12],
                [13,14,15],
            ];
            expect(gridl(data).flipX().data()).to.deep.equal([
                [13,14,15],
                [10,11,12],
                [ 7, 8, 9],
                [ 4, 5, 6],
                [ 1, 2, 3],
            ]);
        });

        it('should mirror my grid on the x-axis at a certain y-position', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).flipX(3).data()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at the very top', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).flipX(0).data()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at the very bottom', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).flipX(4).data()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at an index outside at the top', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).flipX(-1).data()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should mirror my grid on the x-axis at an index outside at the bottom', () => {
            const data = [
                [ 1, 6,11],
                [ 2, 7,12],
                [ 3, 8,13],
                [ 4, 9,14],
                [ 5,10,15],
            ];
            expect(gridl(data).flipX(5).data()).to.deep.equal([
                [ 5,10,15],
                [ 4, 9,14],
                [ 3, 8,13],
                [ 2, 7,12],
                [ 1, 6,11],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [ 1, 2],
                [ 4, 5],
            ];
            checkApi(gridl(data).flipX());
        });

    });

    describe('flipY', () => {

        it('should mirror my grid on the y-axis', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).flipY().data()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at a certain x-position', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).flipY(3).data()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at the very left', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).flipY(0).data()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at the very right', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).flipY(4).data()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at an index outside at the left', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).flipY(-1).data()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should mirror my grid on the y-axis at an index outside at the right', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            expect(gridl(data).flipY(5).data()).to.deep.equal([
                [ 5, 4, 3, 2, 1],
                [10, 9, 8, 7, 6],
                [15,14,13,12,11],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [ 1, 2],
                [ 4, 5],
            ];
            checkApi(gridl(data).flipY());
        });
    });

});