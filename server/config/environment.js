'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

var all = {
  env: process.env.NODE_ENV,

  port: process.env.PORT || 3000,

  // Root path of server
  root: path.normalize(`${__dirname}/../../`)
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all);
