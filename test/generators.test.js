import { describe, it } from 'mocha';
import { expect } from 'chai';
import { generators } from '../src';

describe('generators', () => {

    describe('makeDataGrid', () => {

        const { makeDataGrid } = generators;

        it('should generate a grid with (column, row) value pairs', () => {
            const columns = 4;
            const rows = 3;
            const grid = makeDataGrid(columns, rows, ({ column, row }) => `${column},${row}`);
            expect(grid).to.deep.equal([
                ['0,0', '1,0', '2,0', '3,0'],
                ['0,1', '1,1', '2,1', '3,1'],
                ['0,2', '1,2', '2,2', '3,2'],
            ]);
        });

        it('should generate a grid filled with "x"-values', () => {
            const columns = 7;
            const rows = 5;
            const grid = makeDataGrid(columns, rows, () => 'x');
            expect(grid).to.deep.equal([
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ]);
        });

        it('should throw an error if you provide invalid number of rows', () => {
            expect(
                () => makeDataGrid(4, 0, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: 0'
            );

            expect(
                () => makeDataGrid(4, -1, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: -1'
            );

            expect(
                () => makeDataGrid(4, 'balderdash', () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: balderdash'
            );
        });

        it('should throw an error if you provide invalid number of columns', () => {
            expect(
                () => makeDataGrid('balderdash', 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: balderdash'
            );

            expect(
                () => makeDataGrid(-1, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: -1'
            );

            expect(
                () => makeDataGrid(0, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: 0'
            );
        });

        it('should generate a grid with null values if no callback is specified', () => {
            expect(makeDataGrid(4, 3)).to.deep.equal([
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
            ]);
        });

    });

    describe('makeList', () => {

        const { makeDataList } = generators;

        it('should generate a array with 4 values', () => {
            const length = 4;
            const grid = makeDataList(length, (index) => `${index}`);
            expect(grid).to.deep.equal(['0', '1', '2', '3']);
        });

        it('should generate a grid filled with "x"-values', () => {
            const length = 7;
            const grid = makeDataList(length, () => 'x');
            expect(grid).to.deep.equal(['x', 'x', 'x', 'x', 'x', 'x', 'x']);
        });

        it('should throw an error if you provide invalid length', () => {
            expect(
                () => makeDataList('balderdash', () => 'x')
            ).to.throw(
                'Trying to make a list with an invalid length. Given: balderdash'
            );

            expect(
                () => makeDataList(-1, () => 'x')
            ).to.throw(
                'Trying to make a list with an invalid length. Given: -1'
            );

            expect(
                () => makeDataList(0, () => 'x')
            ).to.throw(
                'Trying to make a list with an invalid length. Given: 0'
            );
        });

        it('should generate a grid with null values if no callback is specified', () => {
            expect(makeDataList(4)).to.deep.equal([null, null, null, null]);
        });

    });

    describe('make', () => {

        const { makeGridl } = generators;

        it('should generate a grid with (column, row) value pairs', () => {
            const columns = 4;
            const rows = 3;
            const grid = makeGridl(columns, rows, ({ column, row }) => `${column},${row}`).data();
            expect(grid).to.deep.equal([
                ['0,0', '1,0', '2,0', '3,0'],
                ['0,1', '1,1', '2,1', '3,1'],
                ['0,2', '1,2', '2,2', '3,2'],
            ]);
        });

        it('should generate a grid filled with "x"-values', () => {
            const columns = 7;
            const rows = 5;
            const grid = makeGridl(columns, rows, () => 'x').data();
            expect(grid).to.deep.equal([
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
                ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ]);
        });

        it('should throw an error if you provide invalid number of rows', () => {
            expect(
                () => makeGridl(4, 0, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: 0'
            );

            expect(
                () => makeGridl(4, -1, () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: -1'
            );

            expect(
                () => makeGridl(4, 'balderdash', () => 'x')
            ).to.throw(
                'You need to specify at least one row. Given: balderdash'
            );
        });

        it('should throw an error if you provide invalid number of columns', () => {
            expect(
                () => makeGridl('balderdash', 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: balderdash'
            );

            expect(
                () => makeGridl(-1, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: -1'
            );

            expect(
                () => makeGridl(0, 4, () => 'x')
            ).to.throw(
                'You need to specify at least one column. Given: 0'
            );
        });

        it('should generate a grid with null values if no callback is specified', () => {
            expect(makeGridl(4, 3).data()).to.deep.equal([
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
            ]);
        });

    });

});
