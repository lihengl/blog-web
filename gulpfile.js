var plumber = require("gulp-plumber");
var webpack = require("gulp-webpack");
var cssmin  = require("gulp-minify-css");
var csscon  = require("gulp-concat-css");
var jshint  = require("gulp-jshint");
var watch   = require("gulp-watch");
var react   = require("gulp-react");
var gulp    = require("gulp");


gulp.task("css", function () {
    return gulp.src("stylesheet/*.css").
        pipe(csscon("blog.0.1.0.min.css")).
        pipe(cssmin()).
        pipe(gulp.dest("static"));
});

gulp.task("transform", function () {
    return gulp.src("component/*.jsx").
        pipe(react()).
        pipe(jshint()).
        pipe(jshint.reporter("default", { verbose: true })).
        pipe(gulp.dest("build"));
});

gulp.task("bundle", function () {
    return gulp.src("./client.js").
        pipe(webpack(require("./webpack.config.js"))).
        pipe(gulp.dest("static"));
});

gulp.task("default", function () {
    gulp.watch("stylesheet/*.css", ["css"]);
    gulp.watch("component/*.jsx",  ["transform", "bundle"]);
    return;
});

gulp.task("lint", function () {
    return gulp.src(["server.js", "client.js", "test.js", "./build/*.js"]).
        pipe(jshint()).
        pipe(jshint.reporter("default"));
});

