var gulp = require('gulp');
var flatten = require('gulp-flatten');

gulp.task('copy:js', function () {
  var jsList = ['node_modules/ng-cordova/dist/ng-cordova.min.js',
                'node_modules/angular/angular.js',
                'node_modules/jquery/dist/jquery.min.js'];

  return gulp.src(jsList)
    .pipe(flatten())
    .pipe(gulp.dest('deploy/js'))
});

gulp.task('copy:html', function () {
  return gulp.src('./app/**/'+ process.env.TEMPLATE_NAME + '/templates/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('deploy/content/templates'))
});

gulp.task('copy:languages', function () {
  return gulp.src('./content/' + process.env.TEMPLATE_NAME + '/i18n/*.json')
    .pipe(flatten())
    .pipe(gulp.dest('deploy/content/i18n'))
});

gulp.task('copy:images', function () {
  var imageTypes = ['./content/common/images/**/*.png',
                    './content/common/images/**/*.jpg',
                    './content/common/images/**/*.gif',
                    './content/' + process.env.TEMPLATE_NAME + '/images/**/*.png',
                    './content/' + process.env.TEMPLATE_NAME + '/images/**/*.jpg',
                    './content/' + process.env.TEMPLATE_NAME + '/images/**/*.gif'];

  return gulp.src(imageTypes)
    .pipe(gulp.dest('deploy/content/images'))
});

gulp.task('copy:fonts', function () {
  var fontTypes = ['./content/common/**/*.eot'
                  , './content/common/**/*.svg'
                  , './content/common/**/*.otf'
                  , './content/common/**/*.ttf'
                  , './content/common/**/*.woff'
                  , './content/' + process.env.TEMPLATE_NAME + '/**/*.eot'
                  , './content/' + process.env.TEMPLATE_NAME + '/**/*.svg'
                  , './content/' + process.env.TEMPLATE_NAME + '/**/*.otf'
                  , './content/' + process.env.TEMPLATE_NAME + '/**/*.ttf'
                  , './content/' + process.env.TEMPLATE_NAME + '/**/*.woff'];

  return gulp.src(fontTypes)
    .pipe(flatten())
    .pipe(gulp.dest('deploy/content/fonts'))
});
