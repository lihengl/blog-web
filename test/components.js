'use strict';
var expect = require('chai').expect;
var React = require('react/addons');

var Footer =require('../components/Footer.jsx');



describe('The Rendering of Footer Component', function () {
    var ShallowRenderer = null, RenderOutput = null;

    beforeEach(function (done) {
        ShallowRenderer = React.addons.TestUtils.createRenderer();
        done();
    });

    it('should render to a <div> element at top level', function (done) {
        var TestProps = {author: 'blogger', timestamp: 0};
        ShallowRenderer.render(React.createElement(Footer, TestProps));
        RenderOutput = ShallowRenderer.getRenderOutput();
        expect(RenderOutput.type).to.equal('div');
        done();
    });

});