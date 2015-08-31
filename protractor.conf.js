'use strict';
var config = {
    cucumberOpts: {
        format: 'json',
        require: [
            './stepdefs/**/*.js'
        ]
    },
    framework: 'cucumber',
    specs: [
        './features/**/*.feature'
    ]
};

exports.config = config;
