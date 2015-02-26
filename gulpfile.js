var webpack = require("gulp-webpack");
var nodemon = require("gulp-nodemon");
var flatten = require("gulp-flatten");
var cssmin  = require("gulp-minify-css");
var csscon  = require("gulp-concat-css");
var jshint  = require("gulp-jshint");
var uglify  = require("gulp-uglify");
var react   = require("gulp-react");
var gulp    = require("gulp");

var pkg     = require("./package.json");


gulp.task("lint", function () {
    "use strict";
    return gulp.src([
        "component/__tests__/*.js",
        "react_components/*.js",
        "./*.js",
    ]).
        pipe(jshint()).
        pipe(jshint.reporter("default"));
});

gulp.task("transform", function () {
    "use strict";
    return gulp.src("component/*.jsx").
        pipe(react()).
        pipe(flatten()).
        pipe(gulp.dest("react_components"));
});

gulp.task("bundle:js", ["transform"], function () {
    "use strict";
    return gulp.src("./client.js").
        pipe(webpack({
            externals: {"react": "React"},
            output: {filename: [pkg.name, pkg.version, "min", "js"].join(".")}
        })).
        pipe(uglify()).
        pipe(gulp.dest("static_assets"));
});

gulp.task("bundle:css", function () {
    "use strict";
    return gulp.src("style/*.css").
        pipe(csscon([pkg.name, pkg.version, "min", "css"].join("."))).
        pipe(cssmin()).
        pipe(gulp.dest("static_assets"));
});

gulp.task("develop", ["bundle:css", "bundle:js", "lint"], function () {
    "use strict";
    gulp.watch(["component/*.jsx", "client.js"], ["bundle:js"]);
    gulp.watch(["style/*.css"], ["bundle:css"]);
    return nodemon({
        ignore: ["./component/*", "./react_components/*", "gulpfile.js"],
        script: "server.js",
        env: {"MODE": "local"},
        ext: "css js"
    }).on("change", ["lint"]);
});
