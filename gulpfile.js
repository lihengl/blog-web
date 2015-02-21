var jshint = require("gulp-jshint");
var gulp   = require("gulp");

gulp.task("lint", function () {
    return gulp.src(["server.js", "client.js", "test.js", "./build/*.js"]).
        pipe(jshint()).
        pipe(jshint.reporter("default"));
});

