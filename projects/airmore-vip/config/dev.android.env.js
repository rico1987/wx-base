'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.ios.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PLATFORM: '"android"',
})
