"use strict";
var React = require("react");

var Paragraph = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired
    },
    _handleClick: function (evt) {
        var box = this.getDOMNode().getBoundingClientRect();
        ["X", "Y"].forEach(function (coordinate) {
            console.log(evt["client" + coordinate]);
        });
        ["top", "right", "bottom", "left"].forEach(function (bound) {
            console.log(bound + ": " + Math.round(box[bound]));
        });
    },
    render: function () {
        return <p style={{
            letterSpacing: ".05em",
            marginBottom: 0,
            fontFamily: "Georgia, serif",
            lineHeight: "26px",
            textAlign: "justify",
            marginTop: 50,
            fontSize: 17,
            cursor: "text"}} onClick={this._handleClick}>
            {this.props.children}
        </p>;
    }
});

module.exports = Paragraph;
