var gulp = require("gulp");
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var minify = require("gulp-minify");
var browserSync = require("browser-sync").create();
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task("watch", function() {
  gulp.watch(
    ["./public/sass/*/*.sass", "./public/sass/*.sass"],
    gulp.series("sass", "minify-css", browserSync.reload)
  );
  gulp.watch(
    [
      "./public/javascripts/index.js",
      "./public/javascripts/index2.js",
      "./public/javascripts/index3.js"
    ],
    gulp.series("minify-js", browserSync.reload)
  );
  gulp.watch(
    ["./views/*.pug", "./views/**/*.pug"],
    gulp.series(browserSync.reload)
  );
});

gulp.task("autoprefixer", function() {
  return gulp
    .src("./public/stylesheets/main.css")
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(gulp.dest("./public/stylesheets/"));
});

gulp.task("minify-css", gulp.series("autoprefixer"), function() {
  gulp
    .src("./public/stylesheets/main.css")
    .pipe(cleanCSS({ compatibility: "ie8", keepBreaks: false }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("public/stylesheets/"));
});

gulp.task("sass", function() {
  gulp
    .src("./public/sass/main.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public/stylesheets/"));
});

gulp.task("minify-js", function() {
  gulp
    .src([
      "./public/javascripts/index.js",
      "./public/javascripts/index2.js",
      "./public/javascripts/index3.js"
    ])
    .pipe(
      minify({
        ext: {
          min: ".min.js"
        },
        ignoreFiles: [".combo.js", ".min.js"]
      })
    )
    .pipe(gulp.dest("./public/javascripts/"));
});

gulp.task("browser-sync-proxy", function() {
  browserSync.init({ proxy: "http://localhost:8080" });
});

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("default", gulp.series(gulp.parallel("watch", "browser-sync-proxy")));
