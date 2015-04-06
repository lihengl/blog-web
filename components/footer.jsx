"use strict";
var React = require("react/addons");

var Footer = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
    },
    render: function () {
        return <div style={{
            paddingBottom: 50,
            paddingTop: 50,
            borderTop: "1px solid #DDDDDD",
            textAlign: "center",
            fontSize: 12,
            margin: "100px 0 0 0"}}>
            <p>{"Copyright © 2015 LIHENG"}</p>
        </div>;
    }
});

module.exports = Footer;
