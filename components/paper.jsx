"use strict";
var React = require("react");

var Paper = React.createClass({
    render: function () {
        var paddingSide = 10;
        var maxWidth = 680;
        var width = (this.props.browser.width > maxWidth) ? maxWidth : this.props.browser.width;
        return <div>
            <div style={{
                paddingBottom: 20,
                paddingRight: paddingSide,
                paddingLeft: paddingSide,
                paddingTop: 20,
                margin: "0 auto 0 auto",
                width: width - (paddingSide * 2)}}>
                <h1 style={{fontSize: 40}}>{this.props.title}</h1>
                <p style={{lineHeight: "1.8em", wordWrap: "break-word"}}>asdlkajd</p>
            </div>
        </div>;
    }
});

module.exports = Paper;
