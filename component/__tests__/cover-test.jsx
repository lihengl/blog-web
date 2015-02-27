var React = require("react/addons");
var Utils = React.addons.TestUtils;

jest.dontMock("../cover.jsx");

describe("Cover", function () {
    "use strict";
    var Cover = require("../cover.jsx");

    it("should render correctly", function () {
        var r = Utils.renderIntoDocument(<Cover>A Blog's Title</Cover>);
        var h = Utils.findRenderedDOMComponentWithTag(r, "h1");
        expect(h.getDOMNode().textContent).toEqual("A Blog's Title");
    });

});
