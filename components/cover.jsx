"use strict";
var Adjust = require("../actions/adjust");

var React = require("react");

var Cover = React.createClass({
    _handleClick: function () {
        Adjust.increment(1);
        return;
    },
    render: function () {
        var paddingTop = 0;
        var maxHeight = 600;
        var aspectRatio = (this.props.height > this.props.width) ? 1.0 : (9.0 / 16.0);
        var totalHeight = this.props.width * aspectRatio;

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
            <h1 onClick={this._handleClick} style={{
                marginBottom: 0,
                fontWeight: "bold",
                marginTop: 0,
                fontSize: Math.floor((3.0 * this.props.width + 11280.0) / 260.0)}}>
                {this.props.children}
            </h1>
            <p style={{
                fontSize: Math.round((this.props.width + 3760.0) / 260.0)}}>
                {this.props.width}
            </p>
        </div>;
    }
});

module.exports = Cover;
