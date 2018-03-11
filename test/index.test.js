import { describe, it } from 'mocha';
import { expect } from 'chai';
import gridl, { generators, utils } from '../src';
import { checkApi } from './testUtils';

describe('gridlFactory', () => {

    describe('api', () => {

        it('should return the api', () => {
            checkApi(gridl([[0]]));
        });

        it('should return the static api', () => {
            expect(Object.keys(gridl)).to.have.members(['use']);
        });

    });

    describe('validation', () => {

        it('should throw an error if data is not an array', () => {
            expect(() => gridl('dsfsdf', {})).to.throw();
            expect(() => gridl(undefined, {})).to.throw();
            expect(() => gridl(null, {})).to.throw();
            expect(() => gridl({}, {})).to.throw();
            expect(() => gridl([[]], {})).to.throw();
        });

        it('should throw an error if the arrayType is invalid', () => {
            expect(() => gridl([], { arrayType: '???' })).to.throw();
            expect(() => gridl([], { arrayType: 12 })).to.throw();
        });

        it('should throw an error if you don\'t provide any columns', () => {
            const expectedMsg = 'Trying to import grid without any columns. You need to provide at least one column.';
            expect(() => gridl([[]], {})).to.throw(expectedMsg);
            expect(() => gridl([
                [],
                [],
                [],
            ], {})).to.throw(expectedMsg);
        });

        it('should work with at least one cell', () => {
            expect(() => gridl([[7]], {})).to.not.throw();
        });

    });

    describe('importing', () => {

        describe('validation', () => {

            it('should throw no error if the data structure is valid', () => {
                const data = [
                    [1, 2, 3],
                    [4, 5, 6],
                ];
                expect(() => gridl(data)).to.not.throw();
            });

            it('should throw an error if the data is undefined', () => {
                expect(() => gridl()).to.throw('Trying to import data that is not an array.');
            });

            it('should throw an error if the a rows is not an array', () => {
                const expectedMsg = 'Trying to import data that is not an array.';
                expect(() => gridl([
                    [1,2,3],
                    5,
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    5,
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1,2,3],
                    'dsf',
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1,2,3],
                    [1,2,3],
                    { '0': 0, '1': 1, '2': 2 },
                ])).to.throw(expectedMsg);
            });

            it('should throw an error if the row lengths are not equal', () => {
                const expectedMsg = 'Trying to import data with inconsistent number of columns.';
                expect(() => gridl([
                    [1,2,3],
                    [1,2],
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1,2,3,4],
                    [1,2,3],
                    [1,2,3],
                ])).to.throw(expectedMsg);
                expect(() => gridl([
                    [1],
                    [1],
                    [1,2,3],
                ])).to.throw(expectedMsg);
            });

        });

    });

    describe('custom plugins', () => {

        const mockData = () => [
            [ 1, 2, 3, 4],
            [ 5, 6, 7, 8],
            [ 9,10,11,12],
        ];

        it('should add a plugin', () => {
            const data = mockData();
            gridl.use('test', () => () => 'test');
            expect(gridl(data).test()).to.deep.equal('test');
        });

        it('should provide the instance to the plugin', () => {
            const data = mockData();
            gridl.use('test2', context => () => context);
            const instance = gridl(data);
            expect(instance.test2()).to.deep.equal(instance);
        });

        it('should provide the internal state to the plugin function', () => {
            const data = mockData();
            gridl.use('exposeState', (context, state) => () => {
                const { rows, columns, data } = state;
                return { rows, columns, data };
            });

            const grid = gridl(data);

            expect(grid.exposeState()).to.deep.equal({
                rows: 3,
                columns: 4,
                data: [1,2,3,4,5,6,7,8,9,10,11,12],
            });

            grid.clipAt([2,1], [2,2]);

            expect(grid.exposeState()).to.deep.equal({
                rows: 2,
                columns: 2,
                data: [7,8,11,12],
            });
        });

        it('should be able to change the internal state from within the plugin function', () => {
            const data = mockData();
            gridl.use('changeState', (context, state) => function(rows, columns) {
                state.rows = rows;
                state.columns = columns;
                state.data = utils.flatten([[6,5,4]]);
                return this;
            });
            const grid = gridl(data).changeState(1, 666);
            expect(grid.data()).to.deep.equal([[6,5,4]]);
            expect(grid.numRows()).to.equal(1);
            expect(grid.numColumns()).to.equal(666);
        });

        it('should create a plugin with namespace', () => {
            const data = [
                [ 1, 2, 3, 4, 5],
                [ 6, 7, 8, 9,10],
                [11,12,13,14,15],
            ];
            gridl.use('poop', (context, state) => {
                const { data } = state;
                return {
                    namespace: true,
                    methods: {
                        first: value => {
                            data[0] = value;
                            return context;
                        }
                    },
                };
            });
            expect(gridl(data).poop.first('X').data()).to.deep.equal([
                ['X', 2, 3, 4, 5],
                [  6, 7, 8, 9,10],
                [ 11,12,13,14,15],
            ]);
        });

    });

    describe('examples', () => {

        it('should export a 2d array', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const result = gridl(data).valueAt([1, 2], 10).data();
            expect(result).to.deep.equal([
                [1, 2, 3],
                [4, 5, 6],
                [7, 10, 9],
            ]);
        });

        it('should export a 1d array', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const result = gridl(data).valueAt([1, 2], 10).list();
            expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 10, 9]);
        });

        it('should get a value at a certain position', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const valueAtPosition = gridl(data).valueAt([1, 2]);
            expect(valueAtPosition).to.equal(8);
        });

        it('should set value at position', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];
            const newGrid = gridl(data).valueAt([1, 2], 'Hi').data();
            expect(newGrid).to.deep.equal([
                [1, 2, 3],
                [4, 5, 6],
                [7, 'Hi', 9],
            ]);
        });

        it('should generate a gridl instance', () => {
            // create a gridl instance
            const columns = 4;
            const rows = 3;
            const grid = generators.makeGridl(columns, rows, ({ column, row }) => `${column},${row}`);

            // perform gridl operations
            expect(grid.valueAt([2,1], 'bam').data()).to.deep.equal([
                ['0,0', '1,0', '2,0', '3,0'],
                ['0,1', '1,1', 'bam', '3,1'],
                ['0,2', '1,2', '2,2', '3,2'],
            ]);
        });

        it.skip('should draw a cow', () => {
            const head = [
                ['(','_','_',')'],
                ['(','o','o',')'],
                ['-','\\','/',' '],
            ];
            const back = [
                ['-','-','-','-','-','-','-'],
            ];
            const belly = [
                ['-','-','-','-'],
            ];
            const tail = [
                [' ', ' ', '/'],
                [' ', '/', ' '],
                ['*', ' ', ' '],
            ];
            const hindLegs = [
                ['|',' '],
                ['|','|'],
                ['^','^'],
            ];
            const foreLegs = [
                ['|','|'],
                ['|','|'],
                ['^','^'],
            ];
            const cow = generators.makeGridl(13, 6, () => ' ') // generate 13x6 grid that is filled with whitespaces
                .setAreaAt([9,0], head)
                .setAreaAt([3,2], back)
                .setAreaAt([5,4], belly)
                .setAreaAt([0,2], tail)
                .setAreaAt([3,3], hindLegs)
                .setAreaAt([9,3], foreLegs)
                .addColumn(generators.makeDataList(6, () => '\n'), 13) // add line breaks at the very right
            ;

            function drawTheCow(cow) {
                return cow
                    .data() // export grid data array
                    .reduce((res, row) => res + row.join(''), '') // join grid to a single string
                ;
            }

            expect(drawTheCow(cow)).to.deep.equal(
                '         (__)\n'  +
                '         (oo)\n'  +
                '  /-------\\/ \n' +
                ' / |     ||  \n'  +
                '*  ||----||  \n'  +
                '   ^^    ^^  \n'
            );

            // mirror the cow on the y-axis
            cow.flipY();
            expect(drawTheCow(cow)).to.deep.equal(
                '\n)__(         ' +
                '\n)oo(         ' +
                '\n /\\-------/  ' +
                '\n  ||     | / ' +
                '\n  ||----||  *' +
                '\n  ^^    ^^   '
            );

            // do some plastic surgery
            cow.valueAt([1,0], '(');
            cow.valueAt([4,0], ')');
            cow.valueAt([1,1], '(');
            cow.valueAt([4,1], ')');
            cow.swapCells([2,2], [3,2]);
            cow.valueAt([11,2], '\\');
            cow.valueAt([12,3], '\\');
            expect(drawTheCow(cow)).to.deep.equal(
                '\n(__)         ' +
                '\n(oo)         ' +
                '\n \\/-------\\  ' +
                '\n  ||     | \\ ' +
                '\n  ||----||  *' +
                '\n  ^^    ^^   '
            );
        });

        // TODO: adapt plugin usage in docs
        it('should set the first cell', () => {
            gridl.use('setFirstCell', function(gridlInstance, state) {
                // create the plugin function
                return function(value) {
                    state.data[0] = value; // set the first cell in the grid
                    return gridlInstance;  // return the gridl instance to allow method chaining
                };
            });
            const data = [
                [6,6,6],
                [6,6,6],
            ];
            expect(gridl(data).setFirstCell(1).data()).to.deep.equal([
                [1,6,6],
                [6,6,6],
            ]);
        });

        // TODO: adapt plugin usage in docs
        it('should filter odd and even rows', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
                [10,11,12],
                [13,14,15],
            ];
            gridl.use('oddEvenPlugin', function(instance, state) {

                const evenFilter = (row, index) => index % 2;
                const oddFilter = (row, index) => !evenFilter(row, index);

                function filter(filterMethod) {
                    const grid = utils.unflatten(state.data, state.columns);
                    const filteredData = grid.filter(filterMethod);
                    state.rows = filteredData.length;
                    state.data = utils.flatten(filteredData);
                    return instance;
                }

                return {
                    methods: {
                        filterOddRows: filter.bind(this, oddFilter),
                        filterEvenRows: filter.bind(this, evenFilter),
                    },
                };
            });
            expect(gridl(data).filterOddRows().data()).to.deep.equal([
                [1,2,3],
                [7,8,9],
                [13,14,15],
            ]);
            expect(gridl(data).filterEvenRows().data()).to.deep.equal([
                [4,5,6],
                [10,11,12],
            ]);
        });

        // TODO: adapt plugin usage in docs
        it('should filter odd and even rows using a namespace', () => {
            const data = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
                [10,11,12],
                [13,14,15],
            ];
            gridl.use('oddEven', function(instance, state) {
                const evenFilter = (row, index) => index % 2;
                const oddFilter = (row, index) => !evenFilter(row, index);

                function filter(filterMethod) {
                    const grid = utils.unflatten(state.data, state.columns);
                    const filteredData = grid.filter(filterMethod);
                    state.rows = filteredData.length;
                    state.data = utils.flatten(filteredData);
                    return instance;
                }

                return {
                    namespace: true,
                    methods: {
                        filterOddRows: filter.bind(this, oddFilter),
                        filterEvenRows: filter.bind(this, evenFilter),
                    },
                };
            });
            expect(gridl(data).oddEven.filterOddRows().data()).to.deep.equal([
                [1,2,3],
                [7,8,9],
                [13,14,15],
            ]);
            expect(gridl(data).oddEven.filterEvenRows().data()).to.deep.equal([
                [4,5,6],
                [10,11,12],
            ]);
        });

    });

});
