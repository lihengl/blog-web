"use strict";
var React = require("react/addons");

var Footer = React.createClass({
    propTypes: {
        author: React.PropTypes.string.isRequired,
        timestamp: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    render: function () {
        var year = (new Date(this.props.timestamp)).getFullYear();
        return (<div style={{
            borderTop: "1px solid #DDDDDD",
            fontSize: 12,
            margin: "100px 0 0 0",
            padding: "50px 0 50px 0",
            textAlign: "center"}}>
            <div>{[year, this.props.author.toUpperCase()].join(" © ")}</div>
        </div>);
    }
});

module.exports = Footer;
