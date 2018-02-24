import utils from './utils';
import generators from './generators';
import plugins from './plugins';
import directions from './directions';
import adjacences from './adjacences';

const { flatten, validateGridArray } = utils;

function StateProvider(initialState = {}) {
    const _state = { ...initialState };
    return {
        getState: () => _state,
        setState: newState => Object.entries(newState).forEach(([key, value]) => _state[key] = value),
    };
}

function _registerPlugins(stateProvider, plugins) {
    Object.entries(plugins).forEach(([key, pluginFactory]) => {
        const plugin = pluginFactory(this, stateProvider);
        const type = typeof plugin;

        // plugin is just a function
        if (type === 'function') {
            this[key] = plugin;
        }

        // plugin returns multiple functions with a namespace
        else if (type === 'object' && plugin.methods && plugin.namespace) {
            this[key] = plugin.methods;
        }

        // plugin returns multiple functions without a namespace
        else if (type === 'object' && plugin.methods) {
            Object.entries(plugin.methods).forEach(([k, func]) => {
                this[k] = func;
            });
        }
    });
}

/**
 * @class
 * @private
 */
function gridl(plugins, data) {

    // validate incoming data
    validateGridArray(data);

    const _stateProvider = new StateProvider({
        rows: data.length,
        columns: data[0].length,
        data: flatten(data),
        position: [0,0],
    });
    _registerPlugins.call(this, _stateProvider, plugins);

    return this;
}

/**
 * Creates a new gridl instance.
 *
 * @constructs gridl
 * @param {Array.<Array.<*>>} data - A two dimensional grid array. Every row needs to have the same length.
 */
const gridlFactory = data => new gridl(plugins, data);
gridlFactory.fn = plugins;

export { utils, generators, adjacences, directions };

export default gridlFactory;
