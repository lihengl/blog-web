"use strict";
var React = require("react/addons");

var Header = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    render: function () {
        var aspect = (this.props.height > this.props.width) ? 1.0 : (9.0 / 16.0);
        var height = Math.min(600, (this.props.width * aspect));

        return (<div style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/static_assets/cover.jpg)",
            backgroundSize: "cover",
            paddingTop: Math.round(height / 3.0),
            textShadow: "0 1px 2px rgba(0,0,0,.5)",
            textAlign: "center",
            height: Math.floor(height * (2.0 / 3.0)),
            color: "#FFFFFF"}}>
            <h1 style={{
                marginBottom: 0,
                fontWeight: "bold",
                marginTop: 0,
                fontSize: Math.floor((3.0 * this.props.width + 12280.0) / 260.0)}}>
                {this.props.children}
            </h1>
            <p style={{fontSize: Math.round((this.props.width + 3760.0) / 260.0)}}>
                {this.props.width}
            </p>
        </div>);
    }
});

module.exports = Header;
