'use strict';
var expect = require('chai').expect;
var React = require('react/addons');

var Footer = require('../components/Footer.jsx');


describe('Footer Component', function () {
  var ShallowRenderer = null;

  beforeEach('initialize ShallowRenderer', function () {
    ShallowRenderer = React.addons.TestUtils.createRenderer();
  });

  it('should render to a <div> element at top level', function () {
    var TestProps = {author: 'blogger', timestamp: 0};
    ShallowRenderer.render(React.createElement(Footer, TestProps));
    expect(ShallowRenderer.getRenderOutput().type).to.equal('div');
  });

});