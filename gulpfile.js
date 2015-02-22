"use strict";

var webpack = require("gulp-webpack");
var nodemon = require("gulp-nodemon");
var cssmin  = require("gulp-minify-css");
var csscon  = require("gulp-concat-css");
var jshint  = require("gulp-jshint");
var uglify  = require("gulp-uglify");
var react   = require("gulp-react");
var gulp    = require("gulp");

var pkg     = require("./package.json");
var out     = [pkg.name, pkg.version, "min"].join(".");


gulp.task("lint", function () {
    return gulp.src(["gulpfile.js", "server.js", "client.js", "test.js"]).
        pipe(jshint()).
        pipe(jshint.reporter("default"));
});

gulp.task("bundle:css", function () {
    return gulp.src("stylesheet/*.css").
        pipe(csscon(out + ".css")).
        pipe(cssmin()).
        pipe(gulp.dest("static"));
});

gulp.task("transform", function () {
    return gulp.src("component/*.jsx").
        pipe(react()).
        pipe(jshint()).
        pipe(jshint.reporter("default", {verbose: true})).
        pipe(gulp.dest("build"));
});

gulp.task("bundle:js", ["transform"], function () {
    return gulp.src("./client.js").
        pipe(webpack({
            externals: {"react": "React"},
            output: {filename: out + ".js"}
        })).
        pipe(uglify()).
        pipe(gulp.dest("static"));
});

gulp.task("develop", function () {
    gulp.watch("stylesheet/*.css", ["bundle:css"]);
    gulp.watch("component/*.jsx",  ["bundle:js"]);
    return nodemon({
        ignore: ["./stylesheet/*", "./build/*", "gulpfile.js"],
        script: "server.js",
        env: {"MODE": "local"},
        ext: "css js"
    }).
        on("change", ["lint"]);
});
