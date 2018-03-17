import { index2pos } from '../utils';

export default function(context, state) {

    /**
     * Find the first occurrence of an element within the entire grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {iteratorCallback} callbackOrValue - The callback function that is called on each element. Should return true if the element is found or false if not.
     * @param {*} [thisArg] Optional. Object to use as <code>this</code> when executing <code>callback</code>.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    function find(callbackOrValue, thisArg) {
        const { data, columns } = state;
        let index;
        if (typeof callbackOrValue === 'function') {
            index = data.findIndex((v, i) => callbackOrValue.call(thisArg, v, index2pos(i, columns), context), thisArg);
        }
        else {
            index = data.findIndex((v) => v === callbackOrValue, thisArg);
        }
        return (index >= 0) ? index2pos(index, columns) : undefined;
    }

    return { methods: { find } };
}
