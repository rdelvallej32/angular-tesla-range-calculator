'use strict';

/*  Need to require in the start file before express can run:
  REF: http://stackoverflow.com/questions/29207878/requirebabel-register-doesnt-work
*/
require('babel-register');

// Export the application

exports = module.exports = require('./server');
