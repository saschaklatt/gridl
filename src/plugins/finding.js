import { index2pos } from '../utils';

export default function(context, stateProvider) {

    const { data, columns } = stateProvider.getState();

    /**
     * Find the first occurrence of an element within the entire grid.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {iteratorCallback} callback - The callback function that is called on each element. Should return true if the element is found or false if not.
     * @returns {(Array.<number>|undefined)} The position of the first element that is found or <code>undefined</code> if nothing was found.
     */
    function find(callback) {
        const index = data.findIndex((v, i) => callback(v, index2pos(i, columns), context));
        return (index >= 0) ? index2pos(index, columns) : undefined;
    }

    return { methods: { find } };
}
