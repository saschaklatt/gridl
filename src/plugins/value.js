import { getValueAt, setValueAt as _setValueAt } from '../utils';

export default function(context, stateProvider) {

    const { data, columns, rows, position } = stateProvider.getState();

    /**
     * Get or set the value at the current position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {*} value - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {*} The cell's value or the gridl instance if you use it as a setter.
     */
    function value(value) {
        if (arguments.length < 1) {
            return getValueAt(data, columns, position);
        }
        _setValueAt(data, columns, rows, position, value);
        return context;
    }

    /**
     * Get or set the value at a certain position.<br>
     * It returns the cell's value if you provide no value and sets it if you do provide a value.
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} pos - The position where you want to set or get the value.
     * @param {*} value - The value you want to set or <code>undefined</code> if you want to get the value.
     * @returns {*} The cell's value or the the same gridl instance if you use it as a setter.
     */
    function valueAt(pos, value) {
        if (arguments.length < 2) {
            return getValueAt(data, columns, pos);
        }
        _setValueAt(data, columns, rows, pos, value);
        return context;
    }

    /**
     * Set the value at the current position. You can also set the cell to <code>undefined</code>
     * The current position can be defined by [goto(position)]{@link gridl#goto} or [walk(direction)]{@link gridl#walk}.
     *
     * @deprecated Use [value()]{@link gridl#value} instead. Will be removed in version >= 0.9.x
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {*} value - The value the cell should have.
     */
    const setValue = value => valueAt(position, value);

    /**
     * Set the value at a certain position. You can also set the cell to <code>undefined</code>
     *
     * @deprecated Use [valueAt()]{@link gridl#valueAt} instead. Will be removed in version > 0.9.x
     *
     * @memberOf gridl
     * @method
     * @instance
     *
     * @param {Array.<number>} pos - The position where you want to set the value.
     * @param {*} value - The value you want to set.
     * @returns {gridl} The same gridl instance.
     */
    const setValueAt = (pos, value) => valueAt(pos, value);

    return { value, valueAt, setValue, setValueAt };
}
