/**
 * A list of predifined directions. Can also be used to represent positions relative to another position.
 * @packageDocumentation
 * @module directions
 */

import {Position} from "./types";

/**
 * Relative position, pointing north.
 * @category directions
 */
export const North = Object.freeze({x:  0, y: -1} as Position);

/**
 * Relative position, pointing north-west.
 * @category directions
 */
export const NorthWest = Object.freeze({x: -1, y: -1} as Position);

/**
 * Relative position, pointing north-east.
 * @category directions
 */
export const NorthEast = Object.freeze({x:  1, y: -1} as Position);

/**
 * Relative position, pointing east.
 * @category directions
 */
export const East = Object.freeze({x:  1, y:  0} as Position);

/**
 * Relative position, pointing south.
 * @category directions
 */
export const South = Object.freeze({x:  0, y:  1} as Position);

/**
 * Relative position, pointing south-east.
 * @category directions
 */
export const SouthEast = Object.freeze({x:  1, y:  1} as Position);

/**
 * Relative position, pointing south-west.
 * @category directions
 */
export const SouthWest = Object.freeze({x: -1, y:  1} as Position);

/**
 * Relative position, pointing west.
 * @category directions
 */
export const West = Object.freeze({x: -1, y:  0} as Position);

/**
 * A list of all orthogonal neighbours in form of relative positions North, East, South, West).
 * @category neighbour-positions
 */
export const OrthogonalDirections = Object.freeze([North, East, South, West]);

/**
 * A list of all diagonal neighbours in form of relative positions (NorthEast, SouthEast, SouthWest, NorthWest).
 * @category neighbour-positions
 * @since 0.11.1
 */
export const DiagonalDirections = Object.freeze([NorthEast, SouthEast, SouthWest, NorthWest]);

/**
 * A list of all surrounding neighbours in form of relative positions (North, NorthEast, East, SouthEast, South, SouthWest, West, NorthWest).
 * @category neighbour-positions
 * @since 0.11.1
 */
export const SurroundingDirections = Object.freeze([North, NorthEast, East, SouthEast, South, SouthWest, West, NorthWest]);
