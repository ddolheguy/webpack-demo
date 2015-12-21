var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');
var replace = require('gulp-replace');
var dir = requireDir('./tasks');
var rename = require("gulp-rename");

var APP_NAME = 'App Name';
var TEMPLATE_NAME = 'templateName';

gulp.task('update-config', function(){
    process.env.TEMPLATE_NAME = TEMPLATE_NAME;
    process.env.APP_NAME = APP_NAME;
    return gulp.src(['./config/config.tpl.json'])
        .pipe(replace('[CLIENTNAME]', TEMPLATE_NAME))
        .pipe(rename("config.json"))
        .pipe(gulp.dest('./config'));
});

gulp.task('build-dev', function(callback) {
  process.stdout.write('>>>>>>>>>> DEVELOPMENT: Setting Client: ' + APP_NAME + ' <<<<<<<<<< \n');
  runSequence('update-config',
              'build:clean',
              ['webpack:dev', 'copy:html', 'copy:js', 'copy:languages', 'copy:images', 'copy:fonts', 'less'],
              'jslint',
              callback);
});

gulp.task('build-prod', function(callback) {
    process.stdout.write('>>>>>>>>>> PRODUCTION: Setting Client: ' + APP_NAME + ' <<<<<<<<<< \n');
    runSequence('update-config',
        'build:clean',
        ['webpack:prod', 'copy:html', 'copy:js', 'copy:languages', 'copy:images', 'copy:fonts', 'less'],
        'jslint',
        callback);
});

// gulp.task("build-dev", ['jslint','webpack:build-dev', 'copyHtml', 'copyJSFiles', 'copyLanguages', 'copyImages', 'copyFonts', 'less'], function() {
//   gulp.watch(["app/**/*"], ['copyHtml', 'less', 'webpack:build-dev', 'jslint']);
// });

gulp.task("dev-server", ["webpack:dev-server"]);
gulp.task('default', ['build-dev']);