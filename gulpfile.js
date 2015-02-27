"use strict";
var webpack = require("gulp-webpack");
var nodemon = require("gulp-nodemon");
var flatten = require("gulp-flatten");
var csspre  = require("gulp-autoprefixer");
var csscon  = require("gulp-concat-css");
var cssmin  = require("gulp-minify-css");
var jshint  = require("gulp-jshint");
var uglify  = require("gulp-uglify");
var react   = require("gulp-react");
var less    = require("gulp-less");
var gulp    = require("gulp");

var pkg     = require("./package.json");


gulp.task("lint", function () {
    return gulp.src(["react_components/*.js", "./*.js"]).
        pipe(jshint()).
        pipe(jshint.reporter("default"));
});


gulp.task("transform", function () {
    return gulp.src("component/*.jsx").
        pipe(react()).
        pipe(flatten()).
        pipe(gulp.dest("react_components"));
});

gulp.task("bundle", ["transform"], function () {
    var outname = [pkg.name, pkg.version, "min", "js"].join(".");
    return gulp.src("./client.js").
        pipe(webpack({
            externals: {"react": "React"},
            output: {filename: outname}
        })).
        pipe(uglify()).
        pipe(gulp.dest("static_assets"));
});

gulp.task("compile", function () {
    var outname = [pkg.name, pkg.version, "min", "css"].join(".");
    return gulp.src("stylesheet/*.less").
        pipe(less()).
        pipe(csspre()).
        pipe(csscon(outname)).
        pipe(cssmin()).
        pipe(gulp.dest("static_assets"));
});

gulp.task("develop", ["compile", "bundle", "lint"], function () {
    gulp.watch(["component/*.jsx", "client.js"], ["bundle"]);
    gulp.watch(["stylesheet/*.less"], ["compile"]);
    return nodemon({
        ignore: [
            "react_components/*",
            "stylesheet/*",
            "component/*",
            "gulpfile.js"
        ],
        script: "server.js",
        env: {"MODE": "development"},
        ext: "css js"
    }).on("change", ["lint"]);
});
