'use strict'

const path = require('path');

module.exports = {
    myAccountMobile: {
        dev: {
            // Paths
            assetsSubDirectory: 'static',
            assetsPublicPath: '/',
            proxyTable: {},

            // Various Dev Server settings
            host: 'localhost', // can be overwritten by process.env.HOST
            port: 9527, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
            autoOpenBrowser: true,
            errorOverlay: true,
            notifyOnErrors: false,
            poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        },
        build: {

        },
    },
}
