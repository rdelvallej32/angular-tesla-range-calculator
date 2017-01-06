'use strict';

import _ from 'lodash';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';

var plugins = gulpLoadPlugins();
var config;

const clientPath = 'src';
const serverPath = 'server';

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
}

gulp.task('start:client', () => {
  nodemon(`-w ${clientPath}`)
    .on('log', onServerLog);
});

gulp.task('start:server', () => {
  process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment.js`);
  nodemon(`-w ${serverPath} ./${serverPath}/${serverPath}.js`)
    .on('log', onServerLog);
});
