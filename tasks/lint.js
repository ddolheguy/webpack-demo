var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jslint', function() {
  return gulp.src('./app/**/*.es6')
    .pipe(jshint({esnext: true}))
    .pipe(jshint.reporter('default')) // linting passed
    .pipe(jshint.reporter('fail')); // linting failed
});
