var expect = require('chai').expect;
var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var PageFooter = require('../components/PageFooter.jsx').default;


describe('PageFooter component', function () {
  var ShallowRenderer = null;

  beforeEach('initialize ShallowRenderer', function () {
    ShallowRenderer = ReactTestUtils.createRenderer();
  });

  it('should render to a <div> element at top level', function () {
    var TestProps = {userName: 'blogger', yearNumber: 2016};
    ShallowRenderer.render(React.createElement(PageFooter, TestProps));
    expect(ShallowRenderer.getRenderOutput().type).to.equal('div');
  });

});
