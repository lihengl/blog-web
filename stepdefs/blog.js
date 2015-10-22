/* eslint-env protractor */
var expect = require('chai').expect;


var drink = function (name, done) {
  expect(['coffee', 'milk', 'tea']).to.include(name);
  done();
};

var friday = function (done) {
  browser.get('/user/article').then(function () {
    done();
  });
};

var stepdefs = function () {
  this.When(/^this is a Friday night$/, friday);
  this.When(/^there should be (.*)$/, drink);
};


module.exports = stepdefs;
