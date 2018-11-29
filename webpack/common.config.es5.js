require('babel-core/register');

const ENV_VARS = require('./env');

module.exports = require('./common.config')(ENV_VARS);