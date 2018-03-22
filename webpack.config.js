const path = require("path");
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = (options = {}) => {

    let plugins = [];

    return {
        entry: "./src/Safetify.ts",
        target: "node",
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        externals: [ nodeExternals() ],
        resolve: {
            extensions: [ ".js", ".ts" ],
            modules: [path.resolve('node_modules')]
        },
        output: {
            filename: "safetify.js",
            path: path.resolve(__dirname, "dist"),
            libraryTarget: 'commonjs'
        },
        plugins: plugins
    }
}