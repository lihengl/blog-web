'use strict';
var webpack = require('webpack-stream');
var uglify  = require('gulp-uglify');
var bsync   = require('browser-sync');
var gulp    = require('gulp');

var pkg     = require('./package.json');


gulp.task('browser-sync', function () {
    bsync({
        logLevel: 'debug',
        files: 'static_assets/*/*.js',
        proxy: 'localhost:3000'
    });
});

gulp.task('build', function () {
    return gulp.src('client.js')
    .pipe(webpack({
        externals: {
            'react/addons': 'React',
            'immutable': 'Immutable',
            'bluebird': 'Promise'
        },
        module: {
            loaders: [{
                loader: 'json',
                test: /\.json$/
            }, {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.jsx$/
            }]
        },
        output: {
            filename: (pkg.name + '.min.js')
        }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('static_assets/' + pkg.version));
});
