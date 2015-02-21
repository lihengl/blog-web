var plumber = require("gulp-plumber");
var webpack = require("gulp-webpack");
var cssmin  = require("gulp-minify-css");
var csscon  = require("gulp-concat-css");
var jshint  = require("gulp-jshint");
var watch   = require("gulp-watch");
var react   = require("gulp-react");
var gulp    = require("gulp");


gulp.task("lint", function () {
    return gulp.src(["server.js", "client.js", "test.js", "./build/*.js"]).
        pipe(jshint()).
        pipe(jshint.reporter("default"));
});

gulp.task("bundle:css", function () {
    var version = require("./package.json").version;
    return gulp.src("stylesheet/*.css").
        pipe(csscon("blog." + version + "min.css")).
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

gulp.task("bundle:js", ["transform"], function () {
    var config = require("./webpack.config.js");
    return gulp.src("./client.js").
        pipe(webpack(config)).
        pipe(gulp.dest("static"));
});

gulp.task("default", function () {
    gulp.watch("stylesheet/*.css", ["bundle:css"]);
    gulp.watch("component/*.jsx",  ["bundle:js"]);
    return;
});

