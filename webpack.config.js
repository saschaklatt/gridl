const pkg = require('./package.json');
const webpack = require('webpack');
const libName = pkg.name;

const env = (function(env) {
    const configs = {
        build: {
            output: {
                filename: libName + '.min.js',
            },
            devtool: 'source-map',
            plugins: [
                new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true }),
            ],
        },
        dev: {
            output: {
                filename: libName + '.js',
            },
            devtool: undefined,
            plugins: [],
        },
    };
    return configs[env];
})(process.env.WEBPACK_ENV);

const config = {
    entry: __dirname + '/src/index.js',
    devtool: env.devtool,
    output: {
        path: __dirname + '/dist',
        filename: env.output.filename,
        library: libName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /(\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: env.plugins,
};

module.exports = config;