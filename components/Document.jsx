"use strict";
var React = require("react/addons");

var H1 = require("./H1.jsx");
var H2 = require("./H2.jsx");
var Img = require("./Img.jsx");
var P = require("./P.jsx");


var Document = React.createClass({
    propTypes: {
        entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        focus: React.PropTypes.shape({
            entry: React.PropTypes.number,
            position: React.PropTypes.number,
            text: React.PropTypes.string
        }),
        style: React.PropTypes.object,
        title: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    getDefaultProps: function () {
        return {focus: null, style: {}};
    },
    componentDidUpdate: function () {
        var textarea = React.findDOMNode(this.refs.textarea);
        var position = 0;
        if (!textarea) { return; }
        if (textarea === document.activeElement) { return; }
        position = this.props.focus.position;
        textarea.setSelectionRange(position, position);
        textarea.focus();
    },
    dispatchEditEvent: function (evt) {
        var detail = evt.target.value;
        window.dispatchEvent(new CustomEvent("edit", {detail: detail}));
    },
    renderEntry: function (entry, index) {
        var rendered = null;
        if (entry.type.toUpperCase() === "PARAGRAPH") {
            rendered = (<P id={index} key={index}>{entry.text}</P>);
        } else if (entry.type.toUpperCase() === "SUBTITLE") {
            rendered = (<H2 id={index} key={index}>{entry.text}</H2>);
        } else if (entry.type.toUpperCase() === "PHOTO") {
            rendered = (<Img
                id={index}
                key={index}
                orientation={entry.orientation}
                text={entry.text}
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
            <H1 id={-1}>{this.props.title}</H1>
            {this.props.entries.map(this.renderEntry)}
            <div style={{overflow: "hidden", position: "fixed", height: 0, top: 0}}>{
                (!this.props.focus) ? false : <textarea
                    onChange={this.dispatchEditEvent}
                    ref="textarea"
                    style={Object.assign({
                        outline: "none",
                        width: "100%"
                    }, this.props.style)}
                    value={this.props.focus.text}>
                </textarea>
            }</div>
        </div>);
    }
});


module.exports = Document;
