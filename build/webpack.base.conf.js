// 公共webpack配置
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=false'
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                limit: 10000,
                name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.svg(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                limit: 10000,
                name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                limit: 10000,
                name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new VueLoaderPlugin()
    ]
}
