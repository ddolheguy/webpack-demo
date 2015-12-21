var gulp = require('gulp');
var less = require('gulp-less');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');

gulp.task('less', function () {

    var lessList = ['./content/common/less/common.less',
        './content/' + process.env.TEMPLATE_NAME + '/less/application.less'];

    return gulp.src(lessList)
        .pipe(less())
        .pipe(flatten())
        .pipe(concat("application.css"))
        .pipe(gulp.dest('deploy/content/css'));
});
