import { getColumn, unflatten, flatten } from '../utils';

function _rotate(grid, columns, steps) {
    const mod = steps % 4;
    const option = mod < 0 ? mod + 4 : mod;
    switch (option) {
        case 0:
            return grid;
        case 1:
            return Array.from({ length: columns }, (v, i) => getColumn(grid, i).reverse());
        case 2:
            return grid.reverse().map((row, r) => row.reverse());
        case 3:
            return Array.from({ length: columns }, (v, i) => getColumn(grid, columns - 1 - i));
        default:
            throw new Error(`Trying to rotate the grid with an invalid steps parameter. Given: ${steps}`);
    }
}

export default function(context, stateProvider) {

    const { data, columns } = stateProvider.getState();

    /**
     * Rotate the array in a 90 degree steps. A positive step turns it clockwise, a negative step turns it counterclockwise.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} steps - The number of 90 degree turns as integer number.
     * @returns {gridl} The same gridl instance.
     */
    function rotate(steps) {
        const grid = _rotate(unflatten(data, columns), columns, steps);
        stateProvider.setState({
            data: flatten(grid),
            rows: grid.length,
            columns: grid[0].length,
        });
        return context;
    }

    return { rotate };
}
