"use strict";
var React = require("react");

var Subtitle = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired
    },
    render: function () {
        return <h2 style={{
            marginBottom: 0,
            marginTop: 50,
            fontSize: 42}}>
            {this.props.children}
        </h2>;
    }
});

module.exports = Subtitle;
