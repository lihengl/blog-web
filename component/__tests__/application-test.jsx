var React = require("react/addons");
var Utils = React.addons.TestUtils;

jest.dontMock("../application.jsx");

describe("Application", function () {
    "use strict";
    var Application = require("../application.jsx");

    it("could just pass", function () {
        var component = Utils.renderIntoDocument(
            <Application />
        );
        var root = Utils.findRenderedDOMComponentWithTag(component, "div");
        expect(root.getDOMNode().textContent).toEqual("");
    });

});
