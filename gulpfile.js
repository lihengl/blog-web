"use strict";
var webpack = require("gulp-webpack");
var nodemon = require("gulp-nodemon");
var flatten = require("gulp-flatten");
var jshint  = require("gulp-jshint");
var uglify  = require("gulp-uglify");
var react   = require("gulp-react");
var gulp    = require("gulp");
var del     = require("del");

var pkg     = require("./package.json");


gulp.task("lint", function () {
    return gulp.src(["react_components/*.js", "*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("clean", function (callback) {
    del([
        "react_components",
        "static_assets/*.js"
    ], callback);
});

gulp.task("transform", function () {
    return gulp.src("components/*.jsx")
        .pipe(react())
        .pipe(flatten())
        .pipe(gulp.dest("react_components"));
});

gulp.task("bundle", ["transform"], function () {
    return gulp.src("client.js")
        .pipe(webpack({
            externals: {
                "bluebird": "Promise",
                "react": "React"
            },
            module: {
                loaders: [{
                    loader: "json",
                    test: /\.json$/
                }]
            },
            output: {
                filename: (pkg.name + "-" + pkg.version + ".min.js")
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest("static_assets"));
});

gulp.task("develop", ["bundle", "lint"], function () {
    gulp.watch([
        "components/**/*.jsx",
        "actions/**/*.js",
        "stores/**/*.js",
        "dispatcher.js",
        "client.js"
    ], ["bundle"]);
    return nodemon({
        ignore: [
            "react_components/*",
            "node_modules",
            "components/*",
            "gulpfile.js"
        ],
        script: "server.js",
        env: {
            "BLUEBIRD_DEBUG": "1",
            "MODE": "local"
        },
        ext: "js"
    }).on("change", ["lint"]);
});
