'use strict';

const path = require('path');
const _ = require('lodash');

var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../`)
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all);
