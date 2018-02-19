import { unflatten, flatten, limit } from '../utils';

function _flip(arr, index) {
    if (index === undefined) {
        return arr.reverse();
    }
    const limitedIdx = limit(index, 0, arr.length - 1);
    const left = arr.filter((v, i) => i < limitedIdx);
    const right = arr.filter((v, i) => i > limitedIdx);
    return [
        ...right.reverse(),
        arr[limitedIdx],
        ...left.reverse(),
    ];
}

export default function(context, stateProvider) {

    const { data, columns } = stateProvider.getState();
    const grid = unflatten(data, columns);

    /**
     * Flips the array on the given x-position
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} xPos - The x-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    const flipX = (xPos) => {
        stateProvider.setState({ data: flatten(_flip(grid, xPos)) });
        return context;
    };

    /**
     * Flips the array on the given y-position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} yPos - The y-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    function flipY(yPos) {
        stateProvider.setState({ data: flatten(grid.map(row => _flip(row, yPos))) });
        return context;
    }

    /**
     * Flips the array on the given x-position
     *
     * @deprecated Will be removed in version > 0.9.x. Use [flipX()]{@link gridl#flipX}  instead.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} xPos - The x-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    const mirrorX = flipX;

    /**
     * Flips the array on the given y-position.
     *
     * @deprecated Will be removed in version > 0.9.x. Use [flipY()]{@link gridl#flipY}  instead.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {number} yPos - The y-position of where to flip the array.
     * @returns {gridl} The same gridl instance.
     */
    const mirrorY = flipY;

    return { flipX, flipY, mirrorX, mirrorY };
}
