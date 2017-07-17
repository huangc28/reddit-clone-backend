/**
 * Entry point of server scripts.
 *
 *  1. Transpile with babeljs to use es6.
 *  2. Execute server.js.
 */
const fs = require('fs')
const { resolve } = require('path')

// read from .babelrc
const config = JSON.parse(fs.readFileSync(
  resolve(__dirname, '../.babelrc'), 'utf-8'
))

require('babel-register')(config)

// executing the server.
require('../index')
