jest.dontMock("../application.jsx");

describe("Application", function () {
    "use strict";
    var React = require("react/addons");
    var Utils = React.addons.TestUtils;
    var Application = React.createElement(require("../application.jsx"));
    var Rendered = Utils.renderIntoDocument(Application);

    it("renders greet message", function () {
        var pTag = Utils.findRenderedDOMComponentWithTag(Rendered, "p");
        expect(pTag.getDOMNode().textContent).toEqual("Hello, world?");
    });
});
