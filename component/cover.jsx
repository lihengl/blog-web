"use strict";
var React = require("react");

var Cover = React.createClass({
    render: function () {
        var maxHeight = 600, totalHeight = 1.0, paddingTop = 1.0;
        var aspectRatio = (this.props.browser.height > this.props.browser.width) ? 1.0 : (9.0 / 16.0);

        totalHeight = this.props.browser.width * aspectRatio;
        totalHeight = (totalHeight > maxHeight) ? maxHeight : totalHeight;

        paddingTop = totalHeight / 3.0;

        return <div style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/static_assets/cover.jpg)",
            backgroundSize: "cover",
            paddingTop: Math.round(paddingTop),
            textShadow: "0 1px 2px rgba(0,0,0,.5)",
            textAlign: "center",
            height: Math.floor(totalHeight - paddingTop),
            color: "#FFFFFF"}}>
            <h1 style={{
                marginBottom: 0,
                marginTop: 0,
                fontWeight: "bold",
                fontSize: Math.floor((3.0 * this.props.browser.width + 11280.0) / 260.0)}}>
                {this.props.children}</h1>
            <p style={{
                fontSize: Math.round((this.props.browser.width + 3760.0) / 260.0)}}>
                {this.props.browser.width}</p>
        </div>;
    }
});

module.exports = Cover;
