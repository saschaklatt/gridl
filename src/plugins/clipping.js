import { addPositions, flatten, unflatten } from '../utils';

const _clip = (data, columns, rows, position, size) => {
    if (position[0] < 0 || position[0] >= columns || position[1] < 0 || position[1] >= rows) {
        throw new Error(`Trying to clip data at an invalid position. Given: ${position}`);
    }
    const endPoint = addPositions(position, size);
    return unflatten(data, columns)
        .filter((row, r) => r >= position[1] && r < endPoint[1])
        .map(row => row.filter((cell, c) => c >= position[0] && c < endPoint[0]));
};

export default function(context, stateProvider) {

    /**
     * Clip an area out of the current grid. It removes all cells that are not inside the given area.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    function clip(size) {
        const { data, columns, rows, position } = stateProvider.getState();
        const grid = _clip(data, columns, rows, position, size);
        stateProvider.setState({
            data: flatten(grid),
            rows: grid.length,
            columns: grid[0].length,
        });
        return context;
    }

    /**
     * Clip an area out of the current grid. It removes all cells that are not inside the given area.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} position - The position the area.
     * @param {Array.<number>} size - The size of the area.
     * @returns {gridl} The same gridl instance.
     */
    function clipAt(position, size) {
        const { data, columns, rows } = stateProvider.getState();
        const grid = _clip(data, columns, rows, position, size);
        stateProvider.setState({
            data: flatten(grid),
            rows: grid.length,
            columns: grid[0].length,
        });
        return context;
    }

    return {
        methods: { clip, clipAt },
    };
}
