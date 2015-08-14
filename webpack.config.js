var path = require('path');
var webpack = require('webpack');

// File location helpers
var PROJECT_ROOT = path.resolve(__dirname, '../');
var MAIN_JS_PATH = path.join(PROJECT_ROOT, 'assets/javascript');
var NODE_MODULES_PATH = path.join(PROJECT_ROOT, 'node_modules');
var FILE_EXTENSION = '.js';

var generateConfig = function (isProduction) {

  var webpackConfig = {

    entry: {
      app: ['.assets/javascript/app.js']
    },

    debug: !isProduction,
    cache: !isProduction,
    devtool: (isProduction) ? undefined : 'inline-source-map',
    watch: !isProduction,

    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
      chunkFilename: '[chunkhash].js',
      filename: '[name].js'
    },

    resolve: {
      root: [
        MAIN_JS_PATH
      ],
      fallback: [
        NODE_MODULES_PATH
      ]
    },

    // allow loaders to be applied to filed outside of the ui directory
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },

    module: {
      loaders: [
        // convert react files to js
        {
          test: /\.js$/,
          loaders: [
            'babel-loader?experimental&optional=runtime'
          ],
          exclude: /node_modules/
        }
      ],
      noParse: /\.min\.js/
    },

    plugins:[]
  };

  // is production
  if (isProduction) {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }));

    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
  }


  return webpackConfig;
};


module.exports = generateConfig;
