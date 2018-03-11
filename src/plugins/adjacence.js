import gridl, {adjacences} from '../index';
import { unflatten, addPositions, isNotInArea } from '../utils';

const _adjacentCells = (grid, position, adjacence, gridSize = null) => {
    return adjacence.reduce((res, direction) => {
        const absPos = addPositions(position, direction);
        const value = grid && grid[absPos[1]] && grid[absPos[1]][absPos[0]];
        if (gridSize) {
            return isNotInArea(gridSize, absPos) ? res : [...res, value];
        }
        else {
            return [...res, value];
        }
    }, []);
};

export default function(context, state) {

    /**
     * Get the values of all adjacent cells at a given position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number[]} position - The position of the cell of which you want to know its adjacent cells.
     * @param {number[][]} [adjacence = [adjacents.ALL]{@link adjacences}] - A list of positions relative to the given position. These positions are considered as the adjacents.
     * @param {boolean} [includeOutsideValues = false] - If <code>false</code>, adjacent cells that are outside the grid will be ignored, if <code>true</code>, <code>undefined</code> will be returned for them.
     * @returns {Array.<*>} The values of the adjacent cells.
     */
    function adjacentCellsAt(position, adjacence = adjacences.ALL, includeOutsideValues = false) {
        const { data, columns, rows } = state;
        const gridSize = !includeOutsideValues && [columns, rows];
        const grid = unflatten(data, columns);
        return _adjacentCells(grid, position, adjacence, gridSize);
    }

    return {
        methods: {
            adjacentCellsAt,
        }
    };
}
