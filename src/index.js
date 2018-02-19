import utils from './utils';
import generators from './generators';
import plugins from './plugins';
import directions from './directions';
import adjacences from './adjacences';

const { flatten, validateGridArray } = utils;

/**
 * @class
 * @private
 */
function gridl(fn, data) {

    // validate incoming data
    validateGridArray(data);

    const _state = {};

    const _stateProvider = {
        getState: () => _state,
        setState: (newState) => {
            // set state
            Object.entries(newState).forEach(([key, value]) => _state[key] = value);

            // update plugins
            Object.entries(fn).forEach(([key, pluginFactory]) => {
                const plugin = pluginFactory(this, _stateProvider);
                const type = typeof plugin;

                // plugin is just a function
                if (type === 'function') {
                    this[key] = plugin;
                }

                // plugin returns multiple functions bundled together in an object
                else if (type === 'object') {
                    Object.entries(plugin).forEach(([k, func]) => {
                        this[k] = func;
                    });
                }
            });
        },
    };

    // set initial state
    _stateProvider.setState({
        rows: data.length,
        columns: data[0].length,
        data: flatten(data),
        position: [0,0],
    });

    return this;
}

/**
 * Creates a new gridl instance.
 *
 * @constructs gridl
 * @param {Array.<Array.<*>>} data - A two dimensional grid array. Every row needs to have the same length.
 */
const gridlFactory = data => new gridl(gridlFactory.fn, data);
gridlFactory.fn = plugins;

export { utils, generators, adjacences, directions };

export default gridlFactory;
