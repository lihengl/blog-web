/* eslint-env protractor */
var protractorConfig = {
  baseUrl: 'http://localhost:3000',
  cucumberOpts: {
    format: 'json',
    require: [
      'stepdefs/**/*.js'
    ]
  },
  framework: 'custom',
  frameworkPath: 'node_modules/protractor-cucumber-framework',
  specs: [
    'features/**/*.feature'
  ]
};

protractorConfig.onPrepare = function () {
  browser.ignoreSynchronization = true;
};

exports.config = protractorConfig;
