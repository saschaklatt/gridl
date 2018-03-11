import utils from './utils';
import generators from './generators';
import corePlugins from './plugins';
import directions from './directions';
import adjacences from './adjacences';

const { flatten, validateGridArray } = utils;

const usedPlugins = [];

function registerPlugins(state) {
    const register = ([key, pluginFactory]) => {
        const plugin = pluginFactory(this, state);
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
    };

    // Object.entries(plugins).forEach(register);
    usedPlugins.forEach(register);
}

/**
 * @class
 * @private
 */
function gridl(data) {

    // validate incoming data
    validateGridArray(data);

    // create initial state
    const initialState = {
        rows: data.length,
        columns: data[0].length,
        data: flatten(data),
    };

    // register plugins with initial state
    registerPlugins.call(this, initialState);

    return this;
}

/**
 * Creates a new gridl instance.
 *
 * @constructs gridl
 * @param {Array.<Array.<*>>} data - A two dimensional grid array. Every row needs to have the same number of columns.
 */
const gridlFactory = data => new gridl(data);

/**
 * Register a plugin.
 *
 * @param {string} id - An unique ID to identify the plugin.
 * @param {Object} plugin - The plugin itself.
 */
gridlFactory.use = (id, plugin) => {
    usedPlugins.push([id, plugin]);
};

// register core plugins
Object.entries(corePlugins).forEach(([key, plugin]) => gridlFactory.use(key, plugin));

export { utils, generators, adjacences, directions };

export default gridlFactory;
