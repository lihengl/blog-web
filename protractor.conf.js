'use strict';
var config = {
  baseUrl: 'http://localhost:3000',
  cucumberOpts: {
    format: 'json',
    require: [
      'stepdefs/**/*.js'
    ]
  },
  framework: 'cucumber',
  specs: [
    'features/**/*.feature'
  ]
};

config.onPrepare = function () {
  browser.ignoreSynchronization = true;
};

exports.config = config;
