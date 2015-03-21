"use strict";
var React = require("react/addons");
var Utils = React.addons.TestUtils;

jest.dontMock("../application.jsx");

describe("Application Component", function () {
    var Application = require("../application.jsx");

    it("could just pass", function () {
        var component = Utils.renderIntoDocument(
            <Application title={"Unit Testing"}/>
        );
        var root = Utils.findRenderedDOMComponentWithTag(component, "div");
        expect(root.getDOMNode().textContent).toEqual("");
    });

});
