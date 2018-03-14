import { getValueAt, isValidPositionFormat, setValueAt } from '../utils';

export default function(context, state) {

    /**
     * Get or set the value at a certain position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} pos - The position where you want to set or get the value.
     * @param {*} [value] - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {*} The cell's value or the the same gridl instance if you use it as a setter.
     */
    function valueAt(pos, value) {
        const { data, columns, rows } = state;
        if (!isValidPositionFormat(pos)) {
            throw new Error(`Trying to access value at an invalid position: ${pos}`);
        }
        if (arguments.length < 2) {
            return getValueAt(data, columns, pos);
        }
        setValueAt(data, columns, rows, pos, value);
        return context;
    }

    return { methods: { valueAt } };
}
