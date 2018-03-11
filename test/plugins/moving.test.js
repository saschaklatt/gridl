import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl from '../../src';
import { checkApi } from '../testUtils';

describe('moving', () => {

    describe('moveAbs', () => {

        it('should move a cell from lower to a higher index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const from = [2,1];
            const to = [3,4];
            expect(gridl(grid).goto(from).moveAbs(to).data()).to.deep.equal([
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8,10,11,12,13],
                [14,15,16,17,18,19],
                [20,21,22,23,24,25],
                [26,27,28, 9,29,30],
            ]);
        });

        it('should move a cell from higher to a lower index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const from = [4,3];
            const to = [1,0];
            expect(gridl(grid).goto(from).moveAbs(to).data()).to.deep.equal([
                [ 1,23, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10,11],
                [12,13,14,15,16,17],
                [18,19,20,21,22,24],
                [25,26,27,28,29,30],
            ]);
        });

        it('should throw an error if the target position is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).goto([1,4]).moveAbs([-1,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [-1,0]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveAbs([0,-1])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [0,-1]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveAbs([1,5])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveAbs([6,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [6,0]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveAbs('balderdash')
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [balderdash]'
            );
        });

    });

    describe('moveCell', () => {

        it('should move a cell from lower to a higher index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const from = [2,1];
            const to = [3,4];
            expect(gridl(grid).moveCell(from, to).data()).to.deep.equal([
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8,10,11,12,13],
                [14,15,16,17,18,19],
                [20,21,22,23,24,25],
                [26,27,28, 9,29,30],
            ]);
        });

        it('should move a cell from higher to a lower index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const from = [4,3];
            const to = [1,0];
            expect(gridl(grid).moveCell(from, to).data()).to.deep.equal([
                [ 1,23, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10,11],
                [12,13,14,15,16,17],
                [18,19,20,21,22,24],
                [25,26,27,28,29,30],
            ]);
        });

        it('should throw an error if "from" is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).moveCell([-1,0], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [-1,0]'
            );
            expect(
                () => gridl(grid).moveCell([0,-1], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [0,-1]'
            );
            expect(
                () => gridl(grid).moveCell([1,5], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).moveCell([6,0], [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [6,0]'
            );
            expect(
                () => gridl(grid).moveCell('balderdash', [1,4])
            ).to.throw(
                'Trying to move cell from an invalid position. Given: [balderdash]'
            );
        });

        it('should throw an error if "to" is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).moveCell([1,4], [-1,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [-1,0]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], [0,-1])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [0,-1]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], [1,5])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], [6,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [6,0]'
            );
            expect(
                () => gridl(grid).moveCell([1,4], 'balderdash')
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [balderdash]'
            );
        });

    });

    describe('moveColumn', () => {

        it('should move a column at x=0 to x=2', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
            ];
            expect(gridl(data).moveColumn(0, 2).data()).to.deep.equal([
                [ 2, 3, 1, 4],
                [ 6, 7, 5, 8],
                [10,11, 9,12],
            ]);
        });

        it('should move a column at x=3 to x=1', () => {
            const data = [
                [ 1, 2, 3, 4],
                [ 5, 6, 7, 8],
                [ 9,10,11,12],
            ];
            expect(gridl(data).moveColumn(3, 1).data()).to.deep.equal([
                [ 1, 4, 2, 3],
                [ 5, 8, 6, 7],
                [ 9,12,10,11],
            ]);
        });

        it('should return the api', () => {
            checkApi(gridl([[1,2]]).moveColumn(0, 1));
        });

        it('should throw an error if the fromX value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(-1, 0)).to.throw('Trying to move column from an invalid position. Given: -1');
        });

        it('should throw an error if the fromX value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(3, 0)).to.throw('Trying to move column from an invalid position. Given: 3');
        });

        it('should throw an error if the toX value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(1, -1)).to.throw('Trying to move column to an invalid position. Given: -1');
        });

        it('should throw an error if the toX value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveColumn(1, 3)).to.throw('Trying to move column to an invalid position. Given: 3');
        });

    });

    describe('moveRel', () => {

        it('should move a cell from a lower to a higher index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const position = [1,2];
            const direction = [3,2];
            expect(gridl(grid).goto(position).moveRel(direction).data()).to.deep.equal([
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,15,16,17,18,19],
                [20,21,22,23,24,25],
                [26,27,28,29,14,30],
            ]);
        });

        it('should move a cell from a higher to a lower index', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            const position = [4,3];
            const direction = [-2,-1];
            expect(gridl(grid).goto(position).moveRel(direction).data()).to.deep.equal([
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,23,15,16,17],
                [18,19,20,21,22,24],
                [25,26,27,28,29,30],
            ]);
        });

        it('should throw an error if direction is invalid', () => {
            const grid = [
                [ 1, 2, 3, 4, 5, 6],
                [ 7, 8, 9,10,11,12],
                [13,14,15,16,17,18],
                [19,20,21,22,23,24],
                [25,26,27,28,29,30],
            ];
            expect(
                () => gridl(grid).goto([1,4]).moveRel([0,1])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1,5]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveRel([0,-5])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1,-1]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveRel([-2,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [-1,4]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveRel([5,0])
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [6,4]'
            );
            expect(
                () => gridl(grid).goto([1,4]).moveRel('balderdash')
            ).to.throw(
                'Trying to move cell to an invalid position. Given: [1b,4a]' // FIXME: improve error message: [1b,4a]
            );
        });

    });

    describe('moveRow', () => {

        it('should move a row at y=0 to y=2', () => {
            const data = [
                [ 1, 2, 3],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [10,11,12],
                [13,14,15],
            ];
            expect(gridl(data).moveRow(0, 2).data()).to.deep.equal([
                [ 4, 5, 6],
                [ 7, 8, 9],
                [ 1, 2, 3],
                [10,11,12],
                [13,14,15],
            ]);
        });

        it('should move a row at y=3 to y=1', () => {
            const data = [
                [ 1, 2, 3],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [10,11,12],
                [13,14,15],
            ];
            expect(gridl(data).moveRow(3, 1).data()).to.deep.equal([
                [ 1, 2, 3],
                [10,11,12],
                [ 4, 5, 6],
                [ 7, 8, 9],
                [13,14,15],
            ]);
        });

        it('should throw an error if the fromY value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(-1, 0)).to.throw('Trying to move row from an invalid position. Given: -1');
        });

        it('should throw an error if the fromY value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(2, 0)).to.throw('Trying to move row from an invalid position. Given: 2');
        });

        it('should throw an error if the toY value is too low', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(1, -1)).to.throw('Trying to move row to an invalid position. Given: -1');
        });

        it('should throw an error if the toY value is too high', () => {
            const data = [
                [1,2,3],
                [1,2,3],
            ];
            expect(() => gridl(data).moveRow(1, 3)).to.throw('Trying to move row to an invalid position. Given: 3');
        });

    });

});
