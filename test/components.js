"use strict";
var expect = require("chai").expect;

var React = require("react/addons");

var renderer = React.addons.TestUtils.createRenderer();
var Application = React.createFactory(require("../react_components/application"));


describe("Application component", function () {
    renderer.render(Application({
        layout: "dashboard",
        title: "From Unit Test"
    }));

    it("should render to a 'div' element at top level", function () {
        var output = renderer.getRenderOutput();
        expect(output.type).to.equal("div");
        return;
    });
});