var gulp = require('gulp');
var del = require('del');

gulp.task('build:clean', function () {
  return del(['deploy/**/*']);
});
