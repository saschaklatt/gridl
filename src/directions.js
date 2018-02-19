/**
 * Predefined directions you can walk in.<br>
 * Use it in combination with [walk(direction)]{@link gridl#walk}.
 *
 * @namespace
 *
 * @type {Object}
 * @property {Array.<number>} UP - one step up
 * @property {Array.<number>} UP_LEFT - one step left, one step up
 * @property {Array.<number>} UP_RIGHT - one step right, one step up
 * @property {Array.<number>} RIGHT - one step right
 * @property {Array.<number>} LEFT - one step left
 * @property {Array.<number>} DOWN - one step down
 * @property {Array.<number>} DOWN_LEFT - one step left, one step down
 * @property {Array.<number>} DOWN_RIGHT - one step right, one step down
 */
const directions = Object.freeze({
    UP:         Object.freeze([ 0, -1]),
    UP_RIGHT:   Object.freeze([ 1, -1]),
    RIGHT:      Object.freeze([ 1,  0]),
    DOWN_RIGHT: Object.freeze([ 1,  1]),
    DOWN:       Object.freeze([ 0,  1]),
    DOWN_LEFT:  Object.freeze([-1,  1]),
    LEFT:       Object.freeze([-1,  0]),
    UP_LEFT:    Object.freeze([-1, -1]),
});

export default directions;
