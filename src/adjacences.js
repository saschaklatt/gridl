import directions from './directions';

/**
 * Predefined lists of adjacent positions relative to a certain position.
 *
 * @namespace
 *
 * @type {Object}
 * @property {number[][]} ALL - all direct adjacent positions (orthogonal + diagonal) in the order: left to right, top to bottom
 * @property {number[][]} ALL_CW - all direct adjacent positions (orthogonal + diagonal) in clockwise order
 * @property {number[][]} ALL_CCW - all direct adjacent positions (orthogonal + diagonal) in counterclockwise order
 * @property {number[][]} ORTHOGONAL - all orthogonal adjacent positions in the order: left to right, top to bottom
 * @property {number[][]} ORTHOGONAL_CW - all orthogonal adjacent positions in clockwise order
 * @property {number[][]} ORTHOGONAL_CCW - all orthogonal adjacent positions in counterclockwise order
 * @property {number[][]} DIAGONAL - all diagonal adjacent positions in the order: left to right, top to bottom
 * @property {number[][]} DIAGONAL_CW - all diagonal adjacent positions in clockwise order
 * @property {number[][]} DIAGONAL_CCW - all diagonal adjacent positions in counterclockwise order
 */
const adjacences = Object.freeze({
    ALL: Object.freeze([
        directions.UP_LEFT,
        directions.UP,
        directions.UP_RIGHT,
        directions.LEFT,
        directions.RIGHT,
        directions.DOWN_LEFT,
        directions.DOWN,
        directions.DOWN_RIGHT,
    ]),
    ALL_CW: Object.freeze([
        directions.UP,
        directions.UP_RIGHT,
        directions.RIGHT,
        directions.DOWN_RIGHT,
        directions.DOWN,
        directions.DOWN_LEFT,
        directions.LEFT,
        directions.UP_LEFT,
    ]),
    ALL_CCW: Object.freeze([
        directions.UP,
        directions.UP_LEFT,
        directions.LEFT,
        directions.DOWN_LEFT,
        directions.DOWN,
        directions.DOWN_RIGHT,
        directions.RIGHT,
        directions.UP_RIGHT,
    ]),
    ORTHOGONAL: Object.freeze([
        directions.UP,
        directions.LEFT,
        directions.RIGHT,
        directions.DOWN,
    ]),
    ORTHOGONAL_CW: Object.freeze([
        directions.UP,
        directions.RIGHT,
        directions.DOWN,
        directions.LEFT,
    ]),
    ORTHOGONAL_CCW: Object.freeze([
        directions.UP,
        directions.LEFT,
        directions.DOWN,
        directions.RIGHT,
    ]),
    DIAGONAL: Object.freeze([
        directions.UP_LEFT,
        directions.UP_RIGHT,
        directions.DOWN_LEFT,
        directions.DOWN_RIGHT,
    ]),
    DIAGONAL_CW: Object.freeze([
        directions.UP_RIGHT,
        directions.DOWN_RIGHT,
        directions.DOWN_LEFT,
        directions.UP_LEFT,
    ]),
    DIAGONAL_CCW: Object.freeze([
        directions.UP_LEFT,
        directions.DOWN_LEFT,
        directions.DOWN_RIGHT,
        directions.UP_RIGHT,
    ]),
});

export default adjacences;