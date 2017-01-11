'use strict';

import _ from 'lodash';
import http from 'http';
import runSequence from 'run-sequence';
import path from 'path';
import open from 'open';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';

var plugins = gulpLoadPlugins();
var config;

const clientPath = 'src';
const serverPath = 'server';
const paths = {
  server: {
    scripts: [
      `${serverPath}/**/!(*.spec|*.integration).js`,
      `!${serverPath}/config/local.env.sample.js`
    ],
    json: [`${serverPath}/**/*.json`],
    test: {
      integration: [`${serverPath}/**/*.integration.js`, 'mocha.global.js'],
      unit: [`${serverPath}/**/*.spec.js`, 'mocha.global.js']
    }
  }
};

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') + plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') + log.message);
}

function checkAppReady(cb) {
  var options = {
    host: 'localhost',
    port: config.port
  };
  http.get(options, () => cb(true))
    .on('error', () => cb(false));
}

function whenServerReady(cb) {
  var serverReady = false;
  var appReadyInterval = setInterval(() =>
    checkAppReady(ready => {
      if (!ready || serverReady) {
        return;
      }
      clearInterval(appReadyInterval);
      serverReady = true;
      cb();
    }), 100);
}

gulp.task('start:client', cb => {
  whenServerReady(() => {
    nodemon(`-w ${clientPath}`);
    cb();
  });
});

gulp.task('start:server', () => {
  process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment.js`);
  console.log(config);
  nodemon(`-w ${serverPath} ./${serverPath}/index.js`)
    .on('log', onServerLog);
});

gulp.task('serve', cb => {
  runSequence(['start:server', 'start:client'], cb);
});
