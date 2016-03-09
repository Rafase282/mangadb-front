var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['watch']);

gulp.task('watch', function() {
    gulp.watch('./public/stylesheets/style.sass', ['sass']);
});

gulp.task('sass', function() {
    gulp.src('./public/stylesheets/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});