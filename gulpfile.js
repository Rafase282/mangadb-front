var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['watch', 'sass']);

gulp.task('watch', function() {
    gulp.watch('./public/sass/**/*.sass', ['sass']);
});

gulp.task('sass', function() {
    gulp.src('./public/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});