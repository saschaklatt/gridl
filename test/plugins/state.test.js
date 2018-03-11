import { describe, it } from 'mocha';
import gridl from '../../src';
import { expect } from 'chai';

describe('state', () => {

    describe('data', () => {

        describe('getter', () => {

            it('should export 2d without dimensions given', () => {
                const data = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                ];
                const g = gridl(data);
                expect(g.data()).to.deep.equal([
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                ]);
            });

        });

        describe('setter', () => {

            const mockData = () => [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];

            it('should import valid grid data', () => {
                const g = gridl(mockData()).data([
                    [9, 8, 7],
                    [6, 5, 4],
                    [3, 2, 1],
                ]);
                expect(g.data()).to.deep.equal([
                    [9, 8, 7],
                    [6, 5, 4],
                    [3, 2, 1],
                ]);
            });

            it('should return the gridl instance', () => {
                const g = gridl(mockData());
                expect(g.data([
                    [9, 8, 7],
                    [6, 5, 4],
                    [3, 2, 1],
                ])).to.deep.equal(g);
            });

            it('should throw an error when inconsistent number of columns', () => {
                expect(() => gridl(mockData()).data([
                    [9, 8, 7],
                    [6, 5],
                    [3, 2, 1],
                ])).to.throw('Trying to import data with inconsistent number of columns.');
            });

            it('should throw an error when not an array', () => {
                expect(() => gridl(mockData()).data({ test: 'hello'})).to.throw('Trying to import data that is not an array.');
            });

            it('should throw an error when row is not an array', () => {
                expect(() => gridl(mockData()).data([
                    [9, 8, 7],
                    {0: 6, 1: 5, 2: 4},
                    [3, 2, 1],
                ])).to.throw('Trying to import data that is not an array.');
            });

            it('should throw an error when no columns', () => {
                expect(() => gridl(mockData()).data([
                    [],
                    [],
                ])).to.throw('Trying to import grid without any columns. You need to provide at least one column.');
            });

        });

    });

    describe('list', () => {

        it('should export all entries as one dimensional array', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const g = gridl(data);
            expect(g.list()).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

    });

    describe('clone', () => {

        it('should make a copy', () => {
            const data = [
                [1,2,3,4],
                [5,6,7,8],
            ];
            const master = gridl(data);
            const clone = master.clone();
            expect(master === clone).to.equal(false);
            expect(clone.data()).to.deep.equal(master.data());
            expect(clone.position()).to.deep.equal(master.position());
        });

    });

    describe('size', () => {

        it('should get the size', () => {
            const data = [
                [1,2,3],
                [4,5,6],
            ];
            const g = gridl(data);
            expect(g.size()).to.deep.equal([3,2]);
        });

        it('should use default size without options', () => {
            const data = [
                [1,2,3,4,5,6]
            ];
            const g = gridl(data);
            expect(g.numRows()).to.equal(1);
            expect(g.numColumns()).to.equal(6);
            expect(g.size()).to.deep.equal([6, 1]);
        });

    });

});