import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';
import { checkApi } from '../testUtils';

describe('columns', () => {

    describe('addColumn', () => {

        it('should add a column at the very left', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [
                7,
                8,
            ];
            expect(gridl(data).addColumn(column, 0).data()).to.deep.equal([
                [7,1,2,3],
                [8,4,5,6],
            ]);
        });

        it('should add a column at the very right', () => {
            const data= [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            const column = [
                9,
                9,
                9,
            ];
            expect(gridl(data).addColumn(column, 3).data()).to.deep.equal([
                [1,2,3,9],
                [4,5,6,9],
                [7,8,9,9],
            ]);
        });

        it('should add a column somewhere in the middle', () => {
            const data= [
                [1,2],
                [4,5],
            ];
            const column = [
                7,
                8,
            ];
            expect(gridl(data).addColumn(column, 1).data()).to.deep.equal([
                [1,7,2],
                [4,8,5],
            ]);
        });

        it('should update the amount of columns', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [
                7,
                8,
            ];
            expect(gridl(data).addColumn(column, 1).numColumns()).to.equal(4);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2],[5,6]]).addColumn([3,4], 1));
        });

        it('should throw an error if the position is too low', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [7,8];
            expect(() => gridl(data).addColumn(column, -1)).to.throw(
                'Trying to add column at an invalid position. Given: -1'
            );
        });

        it('should throw an error if the position is too high', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const column = [7,8,9];
            expect(() => gridl(data).addColumn(column, 4)).to.throw(
                'Trying to add column at an invalid position. Given: 4'
            );
        });

        it('should throw an error if the column contains an invalid amount of cells', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            expect(() => gridl(data).addColumn([7], 0).data()).to.throw(
                'Trying to add a column that contains an invalid amount of cells. Expected: 2, Given: 1'
            );
            expect(() => gridl(data).addColumn([7,8,9], 0).data()).to.throw(
                'Trying to add a column that contains an invalid amount of cells. Expected: 2, Given: 3'
            );
        });

    });

    describe('column', () => {

        it('should get me the column at a certain x-position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).column(0)).to.deep.equal([1,4,7]);
            expect(gridl(data).column(1)).to.deep.equal([2,5,8]);
            expect(gridl(data).column(2)).to.deep.equal([3,6,9]);
        });

        it('should return undefined for positions that are outside of the grid', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).column(-1)).to.deep.equal(undefined);
            expect(gridl(data).column(3)).to.deep.equal(undefined);
            expect(() => gridl(data).column(-1)).to.not.throw();
        });

    });

    describe('numColumns', () => {

        it('should get the columns', () => {
            const data = [
                [1,2],
                [3,4],
                [5,6],
            ];
            const g = gridl(data);
            expect(g.numColumns()).to.equal(2);
        });

    });

    describe('removeColumn', () => {

        it('should remove a column from the very left', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumn(0).data()).to.deep.equal([
                [2,3],
                [5,6],
            ]);
        });

        it('should remove a column from the middle', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumn(1).data()).to.deep.equal([
                [1,3],
                [4,6],
            ]);
        });

        it('should remove a column from the very right', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumn(2).data()).to.deep.equal([
                [1,2],
                [4,5],
            ]);
        });

        it('should update the number of columns', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            expect(gridl(data).removeColumn(0).numColumns()).to.equal(2);
        });

        it('should return the api', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            checkApi(gridl(data).removeColumn(0));
        });

        it('should throw an error if the position is too low', () => {
            expect(() => gridl([
                [1,2,3],
                [4,5,6],
            ]).removeColumn(-1)).to.throw('Trying to remove a column at an invalid position. Given: -1');
        });

        it('should throw an error if the position is too high', () => {
            expect(() => gridl([
                [1,2,3],
                [4,5,6],
            ]).removeColumn(3)).to.throw('Trying to remove a column at an invalid position. Given: 3');
        });

        it('should throw an error if there would not be empty after removing', () => {
            expect(() => gridl([
                [1],
                [4],
            ]).removeColumn(0)).to.throw('Cannot remove column because the grid would be empty after it.');
        });

    });

});