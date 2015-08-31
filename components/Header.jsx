"use strict";
var React = require("react/addons");

var Header = React.createClass({
    propTypes: {
        children: React.PropTypes.shape({
            name: React.PropTypes.string,
            tagline: React.PropTypes.string
        }).isRequired,
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
            <div style={{
                fontSize: Math.floor((3.0 * this.props.width + 12280.0) / 260.0),
                fontWeight: "bold",
                marginBottom: 0,
                marginTop: 0}}>
                {this.props.children.name}
            </div>
            <div style={{fontSize: Math.round((this.props.width + 3760.0) / 260.0)}}>
                {this.props.children.tagline}
            </div>
        </div>);
    }
});

module.exports = Header;
