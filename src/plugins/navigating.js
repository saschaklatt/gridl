import gridl from '../index';
import { addPositions, isValidPositionFormat } from '../utils';

export default function(context, state) {

    /**
     * Get the current position.
     *
     * @returns {Array} The current position array [column, row].
     */
    function position() {
        const { position } = state;
        return [
            position[0],
            position[1],
        ];
    }

    /**
     * Go to an absolute position.
     * The internal cursor will be set to this position and can then be used for further operations.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} position - The new position.
     * @returns {gridl}
     */
    function goto(position) {
        if (!isValidPositionFormat(position)) {
            throw new Error(`Trying to go to an invalid position. Given: ${position}`);
        }
        state.position = [
            position[0],
            position[1],
        ];
        return context;
    }

    /**
     * Walk in a given direction based on the current position.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array} direction - The direction you want to go. (It's the position relative to the current position)
     * @returns {gridl} The same gridl instance.
     */
    function walk(direction) {
        const { position } = state;
        if (!isValidPositionFormat(direction)) {
            throw new Error(`Trying to walk into an invalid direction. Given: ${direction}`);
        }
        state.position = addPositions(position, direction);
        return context;
    }

    return {
        methods: {
            goto,
            position,
            walk,
        },
    };
}
