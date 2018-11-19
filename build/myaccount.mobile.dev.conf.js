// myaccont mobile webpack设置
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var config = require('../config');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

var webpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    entry: "./projects/myaccountMobile/src/main.js",
    output: {
        path: path.resolve(process.cwd(), './projects/myaccountMobile/dist'),
        filename: "bundle.js",
        library: "MyAccountMobile",
        // libraryTarget: 'commonjs2',
    },
    resolve: {
        '@': resolve(),
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({})
    ]
})

module.exports = webpackConfig;
