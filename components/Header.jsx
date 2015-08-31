"use strict";
var React = require("react/addons");

var Header = React.createClass({
    propTypes: {
        blog: React.PropTypes.shape({
            cover: React.PropTypes.string,
            name: React.PropTypes.string,
            tagline: React.PropTypes.string
        }).isRequired,
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    render: function () {
        var width = this.props.width;
        var aspect = (this.props.height > width) ? 1.0 : (9.0 / 16.0);
        var height = Math.min(600, (width * aspect));

        return (<div style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(" + this.props.blog.cover + ")",
            backgroundSize: "cover",
            paddingTop: Math.round(height / 3.0),
            textShadow: "0 1px 2px rgba(0,0,0,.5)",
            textAlign: "center",
            height: Math.floor(height * (2.0 / 3.0)),
            color: "#FFFFFF"}}>
            <div style={{
                fontSize: Math.floor((3.0 * width + 12280.0) / 260.0),
                fontWeight: "bold",
                marginBottom: 0,
                marginTop: 0}}>
                {this.props.blog.name}
            </div>
            <div style={{fontSize: Math.round((width + 3760.0) / 260.0)}}>
                {this.props.blog.tagline}
            </div>
        </div>);
    }
});

module.exports = Header;
