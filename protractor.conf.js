/* eslint-env protractor */
'use strict';

var protractorConfig = {
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

protractorConfig.onPrepare = function () {
  browser.ignoreSynchronization = true;
};

exports.config = protractorConfig;
