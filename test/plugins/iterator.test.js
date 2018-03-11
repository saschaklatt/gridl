import { describe, it } from 'mocha';
import gridl from '../../src';
import { expect } from 'chai';
import { checkApi } from '../testUtils';

describe('iterators', () => {

    describe('map', () => {

        it('should map all values of the grid', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            const origin = gridl(data);
            const copy = origin.map((value, pos, src) => {
                const [column, row] = pos;
                expect(value).to.equal(data[row][column]);
                expect(src).to.deep.equal(origin);
                return 'x';
            });
            expect(copy.data()).to.deep.equal([
                ['x','x','x','x'],
                ['x','x','x','x'],
                ['x','x','x','x'],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            checkApi(gridl(data).map(v => v));
        });

        it('should return a copy, not a reference to the same gridl instance', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            const origin = gridl(data);
            const copy = origin.map(v => v);
            expect(origin === copy).to.equal(false);
        });

        it('should throw an error if no callback is provided', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            expect(() => gridl(data).map()).to.throw();
        });

    });

    describe('forEach', () => {

        it('should execute the callback for each cell', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            const master = gridl(data);
            const result = master.forEach((value, pos, src) => {
                const [column, row] = pos;
                expect(value).to.equal(data[row][column]);
                expect(src).to.deep.equal(master);
                return 'x';
            });
            expect(result.data()).to.deep.equal([
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ]);
        });

        it('should return the api', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            checkApi(gridl(data).forEach(v => v));
        });

        it('should return the same gridl instance', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            const master = gridl(data);
            const result = master.forEach(v => v);
            expect(master === result).to.equal(true);
        });

        it('should throw an error if no callback is provided', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            expect(() => gridl(data).forEach()).to.throw();
        });

    });

    describe('fill', () => {

        const mockData = () => [
            [ 1, 2, 3, 4],
            [ 5, 6, 7, 8],
            [10,11,12,13],
        ];

        it('should fill all cells with the same value', () => {
            const res = gridl(mockData()).fill('x').data();
            expect(res).to.deep.equal([
                ['x','x','x','x'],
                ['x','x','x','x'],
                ['x','x','x','x'],
            ]);
        });

        it('should fill all values with the same value, using a callback function', () => {
            const res = gridl(mockData()).fill(() => 'x').data();
            expect(res).to.deep.equal([
                ['x','x','x','x'],
                ['x','x','x','x'],
                ['x','x','x','x'],
            ]);
        });

        it('should fill all values with different values', () => {
            const data = mockData();
            const g = gridl(data);
            g.fill((value, pos, src) => {
                const [column, row] = pos;
                expect(value).to.equal(data[row][column]);
                expect(src).to.deep.equal(g);
                return column < 2 ? 'x' : 'y';
            });
            expect(g.data()).to.deep.equal([
                ['x','x','y','y'],
                ['x','x','y','y'],
                ['x','x','y','y'],
            ]);
        });

        it('should fill all cells with undefined if no value is provided', () => {
            const res = gridl(mockData()).fill().data();
            expect(res).to.deep.equal([
                [undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined],
                [undefined,undefined,undefined,undefined],
            ]);
        });

        it('should return the gridl instance', () => {
            const g = gridl(mockData());
            const res = g.fill(v => v);
            expect(res).to.deep.equal(g);
            checkApi(res);
        });

    });

    describe('reduce', () => {

        it('should execute the callback on each cell', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            const instance = gridl(data);

            // use reduce() to make a copy of "data"
            const copy = instance.reduce((acc, value, pos, src) => {
                expect(src).to.deep.equal(instance);
                const [c, r] = pos;
                if (!acc[r]) {
                    acc[r] = [];
                }
                acc[r][c] = value;
                return acc;
            }, []);

            expect(copy).to.deep.equal(data);
        });

        it('should reduce the grid to sum of all values', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            // calculate the sum of all cells
            expect(gridl(data).reduce((res, value) => res + value, 0)).to.equal(82);
        });

        it('should use the first cell as initial value if initial value is not provided', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            expect(gridl(data).reduce(acc => acc)).to.equal(1);
        });

        it('should use the initial value if provided', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            expect(gridl(data).reduce(acc => acc, 666)).to.equal(666);
        });

        it('should throw an error if no callback is provided', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
                [10,11,12,13],
            ];
            expect(() => gridl(data).reduce()).to.throw();
        });

    });

});