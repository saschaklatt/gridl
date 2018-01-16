const nodeExternals = require('webpack-node-externals');
const path = require('path');

// Setup babel coverage environment
process.env.NODE_ENV = 'coverage';

let config = {
    target: 'node',
    externals: [nodeExternals({
        // whitelist: [], <-- depends of your project
    })],
    devtool: 'source-map',
    stats: {
        colors: true,
        reasons: true,
    },
    module: {
        noParse: [
            /sinon/,
            /iconv-loader/,
            /enzyme/,
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
                include: [
                    path.join(__dirname, 'src'),
                ],
            },
        ]
    },
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
};

module.exports = config;