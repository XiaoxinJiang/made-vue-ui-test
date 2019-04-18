const gulp = require('gulp')
const less = require('gulp-less')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')

// function compile() {
//   return src('./src/*.scss')
//     .pipe(sass.sync())
//     .pipe(autoprefixer({
//       browsers: ['ie > 9', 'last 2 versions'],
//       cascade: false
//     }))
//     .pipe(cssmin())
//     .pipe(dest('./lib'));
// }

gulp.task('compile', function () {
  return gulp.src('./src/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie > 8']
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./lib'))
})
gulp.task('copyfont', function () {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'))
})
// function copyfont() {
//   return src('./src/fonts/**')
//     .pipe(cssmin())
//     .pipe(dest('./lib/fonts'));
// }

gulp.task('build', ['compile', 'copyfont'])
gulp.task('watch', function () {
  gulp.watch('./src/*.less', ['compile'])
})
// exports.build = series(compile, copyfont);
