"use strict";
var webpack = require("gulp-webpack");
var nodemon = require("gulp-nodemon");
var flatten = require("gulp-flatten");
var jshint  = require("gulp-jshint");
var uglify  = require("gulp-uglify");
var react   = require("gulp-react");
var clean   = require("gulp-clean");
var gulp    = require("gulp");

var pkg     = require("./package.json");


gulp.task("lint", function () {
    gulp.src(["react_components/*.js", "*.js"]).
        pipe(jshint()).
        pipe(jshint.reporter("default"));
    return;
});

gulp.task("clean", function () {
    gulp.src(["react_components", "static_assets/*.js"], {
        read: false
    }).pipe(clean());
    return;
});

gulp.task("transform", function () {
    gulp.src("component/*.jsx").
        pipe(react()).
        pipe(flatten()).
        pipe(gulp.dest("react_components"));
    return;
});

gulp.task("bundle", ["transform"], function () {
    var outname = [pkg.name, pkg.version, "min", "js"].join(".");
    gulp.src("./client.js").
        pipe(webpack({
            externals: {"react": "React"},
            output: {filename: outname}
        })).
        pipe(uglify()).
        pipe(gulp.dest("static_assets"));
    return;
});

gulp.task("develop", ["bundle", "lint"], function () {
    gulp.watch(["component/*.jsx", "client.js"], ["bundle"]);
    nodemon({
        ignore: ["react_components/*", "component/*", "gulpfile.js"],
        script: "server.js",
        env: {"MODE": "development"},
        ext: "js"
    }).on("change", ["lint"]);
    return;
});
