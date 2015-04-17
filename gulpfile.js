var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var webpack = require('webpack');
var del = require('del');
var generateWebpackConfig = require("./webpack.config.js");
var once = require('lodash/function/once');
var webpackBuildCount = 0;

var COMPILED_ASSETS = 'public/';

// Task utilities
// -------------------------------------------

/**
 * Build webpack assets (javascript and jsx files).
 * @param isProduction {boolean} - true for production build, false for development watch mode
 * @param callback {function} - callback to call after operation has completed
 */
function buildWebpackAssets (isProduction, callback) {
  var callOnceCallback = once(callback);

  webpack(generateWebpackConfig(isProduction), function(err, stats) {

      gulpUtil.log('ERROR: \n', err);
      gulpUtil.log('stats: \n', stats);

      if (err) {
        throw new gulpUtil.PluginError('webpack', err.msg);
      }
      gulpUtil.log('[webpack]', stats.toString({
        colors: true
      }));

      if (webpackBuildCount !== 0) {
        gulpUtil.log('[webpack]', 'Build Count: ', webpackBuildCount);
        gulpUtil.log('[webpack]', new Date().toISOString());
      }
      webpackBuildCount++;
      callOnceCallback();
    }
  );
}

// Tasks used internally
// -------------------------------------------

/**
 * Deletes the compiled assets directory.
 */
gulp.task('clean', function (callback) {
  del([COMPILED_ASSETS], {
    force: true // required for deleting files outside the current directory
  }, callback);
});


// Main tasks
// -------------------------------------------

/**
 * Build all assets for production.
 */
gulp.task('webpack', function (callback) {
  buildWebpackAssets(true, callback);
});

/**
 * Build webpack assets (javascript and jsx) for development and start webpack watch tasks.
 */
gulp.task('watch_webpack', ['clean'], function(callback) {
  buildWebpackAssets(false, callback)
});

/**
 * Build all assets for development and start watch tasks.
 */
gulp.task('watch', ['watch_webpack']);

/**
 * Alias for watch.
 */
gulp.task('default', ['watch']);

/**
 * Print help to console.
 */
gulp.task('help', function() {
  gulpUtil.log('***********************************************');
  gulpUtil.log('* gulp              (development build & watch)');
  gulpUtil.log('* gulp watch        (development build & watch)');
  gulpUtil.log('* gulp build        (production build)         ');
  gulpUtil.log('* gulp help         (this message)             ');
  gulpUtil.log('***********************************************');
});

module.exports = gulp;
