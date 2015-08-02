'use strict';
var expect = require('chai').expect;

var React = require('react/addons');

var renderer = React.addons.TestUtils.createRenderer();
var Footer = React.createFactory(require('../components/footer.jsx'));


describe('Footer component', function () {
    renderer.render(Footer({
        author: 'blogger'
    }));

    it('should render to a <div> element at top level', function () {
        var output = renderer.getRenderOutput();
        expect(output.type).to.equal('div');
        return;
    });
});