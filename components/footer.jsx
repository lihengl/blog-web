"use strict";
var React = require("react/addons");

var yearNumber = (new Date()).getFullYear();

var Footer = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        author: React.PropTypes.string.isRequired
    },
    render: function () {
        return <div style={{
            paddingBottom: 50,
            paddingTop: 50,
            borderTop: "1px solid #DDDDDD",
            textAlign: "center",
            fontSize: 12,
            margin: "100px 0 0 0"}}>
            <p>{[yearNumber, this.props.author.toUpperCase()].join(" © ")}</p>
        </div>;
    }
});

module.exports = Footer;
