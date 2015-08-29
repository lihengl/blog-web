"use strict";
var H1 = require("./H1.jsx");
var H2 = require("./H2.jsx");
var Img = require("./Img.jsx");
var P = require("./P.jsx");

var React = require("react/addons");


var Document = React.createClass({
    propTypes: {
        entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        title: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    renderEntry: function (entry, index) {
        var rendered = null;
        if (entry.type.toUpperCase() === "PARAGRAPH") {
            rendered = (<P id={index + 1} key={index}>{entry.text}</P>);
        } else if (entry.type.toUpperCase() === "SUBTITLE") {
            rendered = (<H2 id={index + 1} key={index}>{entry.text}</H2>);
        } else if (entry.type.toUpperCase() === "PHOTO") {
            rendered = (<Img
                caption={entry.caption}
                id={index + 1}
                key={index}
                orientation={entry.orientation}
                url={entry.url}
                width={this.props.width} />);
        } else {
            rendered = (<div id={index + 1} key={index} style={{
                marginBottom: 0,
                marginTop: 50,
                color: "#FF0000"}}>
                {"Invalid Type: " + entry.type}
            </div>);
        }
        return rendered;
    },
    render: function () {
        return (<div>
            <H1 id={0}>{this.props.title}</H1>
            {this.props.entries.map(this.renderEntry)}
        </div>);
    }
});


module.exports = Document;
