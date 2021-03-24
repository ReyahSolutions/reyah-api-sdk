const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, options) => ({
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'reyah.sdk.js',
        path: path.resolve(__dirname, 'dist'),
        library: '@reyah/api-sdk',
        libraryTarget: 'umd',
        clean: true,
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            LOGGER_LEVEL: options.mode === 'production' ? 'OFF' : 'DEBUG',
        }),
    ],
});
