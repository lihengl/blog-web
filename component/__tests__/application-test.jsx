var React = require("react/addons");
var Utils = React.addons.TestUtils;

jest.dontMock("../application.jsx");

describe("Application", function () {
    "use strict";
    var Application = require("../application.jsx");

    it("should render correctly", function () {
        var r = Utils.renderIntoDocument(<Application />);
        var p = Utils.findRenderedDOMComponentWithTag(r, "p");
        expect(p.getDOMNode().textContent).toEqual("Hello, world?");
    });

});
