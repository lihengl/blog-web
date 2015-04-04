"use strict";
var IncreaseAction = require("../actions/increase");

var React = require("react/addons");

var Cover = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        height: React.PropTypes.number.isRequired,
        width:  React.PropTypes.number.isRequired
    },
    _handleClick: function () {
        IncreaseAction(1);
        return;
    },
    render: function () {
        var aspectRatio = (this.props.height > this.props.width) ? 1.0 : (9.0 / 16.0);
        var totalHeight = Math.min(600, (this.props.width * aspectRatio));

        return <div style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/static_assets/cover.jpg)",
            backgroundSize: "cover",
            paddingTop: Math.round(totalHeight / 3.0),
            textShadow: "0 1px 2px rgba(0,0,0,.5)",
            textAlign: "center",
            height: Math.floor(totalHeight * (2.0 / 3.0)),
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
