var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");

var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
//var webpackConfig = require("../webpack.config.js");
var htmlWebpackPlugin = require('html-webpack-plugin')

// Development Build
gulp.task("webpack:dev", function(callback) {

  // modify some webpack config options
  var myDevConfig = Object.create({
      devtool: 'sourcemap',
      debug: true,

      entry: './app/app/Index.es6',

      output: {
          path: path.join(__dirname, '../deploy'),
          filename: 'js/[hash].bundle.js'
      },

      module: {
          loaders: [
              {test: /\.es6$/, loader: "babel-loader"},
              {test: /\.json$/, loader: 'json-loader'}
          ]
      },

      resolve: {
          root: [
              path.join(__dirname, '../app'),
              path.join(__dirname, '../config'),
              path.join(__dirname, '../library'),
              path.join(__dirname, '../node_modules'),
          ],
          modulesDirectories: ['library','node_modules'],
          extensions: ["", ".webpack.js", ".web.js", ".js", ".es6"],
          alias: {
          }
      },

      plugins: [new htmlWebpackPlugin({
          title: process.env.APP_NAME,
          filename: 'index.html',
          template : 'app/app/templates/index.html.tpl'
      })]
  });

  // create a single instance of the compiler to allow caching
  var devCompiler = webpack(myDevConfig);

  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:dev", err);
    gutil.log("[webpack:dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack:dev-server", function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new webpackDevServer(webpack(myConfig), {
    publicPath: "/" + myConfig.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack:dev-server", err);
    gutil.log("[webpack:dev-server]", "http://localhost:8080/deploy");
  });
});
