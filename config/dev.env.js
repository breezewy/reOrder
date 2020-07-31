'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"https://helper-api.dmqwl.com"'
  // API_ROOT: '"http://192.168.11.85:21013"'
  // API_ROOT: '"http://193.1.0.135:21013"'
  // API_ROOT: '"https://helper-api.dmqwl.com"'
})
