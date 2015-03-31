"use strict";
var React = require("react/addons");
var Utils = React.addons.TestUtils;

jest.dontMock("../cover.jsx");

describe("Cover Component", function () {
    var Cover = require("../cover.jsx");

    it("should render correctly", function () {
        var title = "A Blog\"s Title";
        var r = Utils.renderIntoDocument(
            <Cover height={900} width={1440}>{title}</Cover>
        );
        var h = Utils.findRenderedDOMComponentWithTag(r, "h1");
        expect(h.getDOMNode().textContent).toEqual(title);
    });

});
