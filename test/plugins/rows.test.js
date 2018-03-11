import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';
import { checkApi } from '../testUtils';

describe('rows', () => {

    describe('addRow', () => {

        it('should add a row at the top', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRow(row, 0).data()).to.deep.equal([
                [7,8,9],
                [1,2,3],
                [4,5,6],
            ]);
        });

        it('should add a row at the bottom', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRow(row, 2).data()).to.deep.equal([
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ]);
        });

        it('should add a row somewhere in the middle', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRow(row, 1).data()).to.deep.equal([
                [1,2,3],
                [7,8,9],
                [4,5,6],
            ]);
        });

        it('should update the amount of rows', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(gridl(data).addRow(row, 1).numRows()).to.equal(3);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2]]).addRow([3,4], 1));
        });

        it('should throw an error if the position is too low', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(() => gridl(data).addRow(row, -1)).to.throw(
                'Trying to add row at an invalid position. Given: -1'
            );
        });

        it('should throw an error if the position is too high', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            const row = [7,8,9];
            expect(() => gridl(data).addRow(row, 3)).to.throw(
                'Trying to add row at an invalid position. Given: 3'
            );
        });

        it('should throw an error if the row contains an invalid amount of cells', () => {
            const data= [
                [1,2,3],
                [4,5,6],
            ];
            expect(() => gridl(data).addRow([7,8], 0).data()).to.throw(
                'Trying to add a row that contains an invalid amount of cells. Expected: 3, Given: 2'
            );
            expect(() => gridl(data).addRow([7,8,9,10], 0).data()).to.throw(
                'Trying to add a row that contains an invalid amount of cells. Expected: 3, Given: 4'
            );
        });

    });

    describe('removeRowAt', () => {

        it('should remove a row from the top', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRow(0).data()).to.deep.equal([
                [4,5,6],
                [7,8,9],
            ]);
        });

        it('should remove a row from the middle', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRow(1).data()).to.deep.equal([
                [1,2,3],
                [7,8,9],
            ]);
        });

        it('should remove a row from the bottom', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRow(2).data()).to.deep.equal([
                [1,2,3],
                [4,5,6],
            ]);
        });

        it('should update the number of rows', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).removeRow(1).numRows()).to.equal(2);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2],[5,6]]).removeRow(0));
        });

        it('should throw an error if the position is too low', () => {
            expect(() => gridl([
                [1,2],
                [2,3],
            ]).removeRow(-1)).to.throw('Trying to remove a row at an invalid position. Given: -1');
        });

        it('should throw an error if the position is too high', () => {
            expect(() => gridl([
                [1,2],
                [2,3],
            ]).removeRow(2)).to.throw('Trying to remove a row at an invalid position. Given: 2');
        });

        it('should throw an error if there would be empty after removing', () => {
            expect(() => gridl([
                [1,2],
            ]).removeRow(0)).to.throw('Cannot remove row because the grid would be empty after it.');
        });

    });

    describe('row', () => {

        it('should get me the row at a certain y-position', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).row(0)).to.deep.equal([1,2,3]);
            expect(gridl(data).row(1)).to.deep.equal([4,5,6]);
            expect(gridl(data).row(2)).to.deep.equal([7,8,9]);
        });

        it('should return undefined for positions that are outside of the grid', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
            ];
            expect(gridl(data).row(-1)).to.deep.equal(undefined);
            expect(gridl(data).row(3)).to.deep.equal(undefined);
            expect(() => gridl(data).row(-1)).to.not.throw();
        });

    });

    describe('numRows', () => {

        it('should get the rows', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            const g = gridl(data);
            expect(g.numRows()).to.equal(2);
        });

    });

});