
const path = require('path')
const fs = require("fs")

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './main.js'
    },
    output: {
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('main.js'), resolve('node_modules/webpack-dev-server/client')]
            }
        ]
    }
}