var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");

var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin')

// PRODUCTION Build
gulp.task("webpack:prod", function(callback) {

  // modify some webpack config options
  var myProdConfig = Object.create({
    entry: './app/flexitravel-app/Index.es6',

    output: {
      // sourcePrefix: '',
      library: 'flexitravel',
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
          template : 'app/flexitravel-app/templates/index.html.tpl'
        }),
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false,
            compress: {
                warnings: false
            }
            //mangle: {
            //    except: ['$super', '$', 'exports', 'require']
            //}
        })
    ]
  });

    // create a single instance of the compiler to allow caching
    var prodCompiler = webpack(myProdConfig);

    prodCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:prod", err);
        gutil.log("[webpack:prod]", stats.toString({
          colors: true
        }));
        callback();
    });
});
