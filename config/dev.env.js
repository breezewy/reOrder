'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://193.1.0.135:21013"'
  // API_ROOT: '"http://193.1.0.135:21014"'
})
