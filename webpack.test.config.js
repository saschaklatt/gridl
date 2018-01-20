const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

const config = {
    target: 'node',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: 'cheap-eval-source-map',
    watch: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],
                include: [
                    path.join(__dirname, 'src'),
                ],
            },
            {
                test: /(\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        modules: [
            'node_modules',
        ],
    },
};

module.exports = config;