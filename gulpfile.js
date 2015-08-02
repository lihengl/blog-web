'use strict';
var webpack = require('gulp-webpack');
var nodemon = require('gulp-nodemon');
var flatten = require('gulp-flatten');
var uglify  = require('gulp-uglify');
var react   = require('gulp-react');
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

gulp.task('compile', function () {
    return gulp.src('components/*.jsx')
    .pipe(react())
    .pipe(flatten())
    .pipe(gulp.dest('react_components'));
});

gulp.task('build', ['compile'], function () {
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
            }]
        },
        output: {
            filename: (pkg.name + '.min.js')
        }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('static_assets/' + pkg.version));
});

gulp.task('develop', ['build'], function () {
    gulp.watch([
        'components/**/*.jsx',
        'actions/**/*.js',
        'stores/**/*.js',
        'dispatcher.js',
        'client.js'
    ], ['build']);
    return nodemon({
        ignore: [
            'react_components/*',
            'static_assets',
            'node_modules',
            'components/*',
            'gulpfile.js',
            'client.js'
        ],
        script: 'server.js',
        env: {
            'BLUEBIRD_DEBUG': '1',
            'MODE': 'local'
        },
        ext: 'js'
    });
});
