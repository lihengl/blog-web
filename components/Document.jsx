"use strict";
var React = require("react/addons");

var Entry = require("./Entry.jsx");


var Document = React.createClass({
    propTypes: {
        entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        focus: React.PropTypes.shape({
            entry: React.PropTypes.number,
            position: React.PropTypes.number,
            text: React.PropTypes.string
        }),
        timestamp: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    getDefaultProps: function () {
        return {focus: null};
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
        var focus = this.props.focus;
        var active = (focus) ? (focus.entry === index) : false;
        return (<Entry
            cursor={(active) ? focus.position : -1}
            id={index}
            key={index}
            timestamp={this.props.timestamp}
            width={this.props.width}>
            {entry}
        </Entry>);
    },
    render: function () {
        var focus = this.props.focus;
        var active = (focus) ? (focus.entry === -1) : false;
        return (<div>
            <Entry
                cursor={(active) ? focus.position : -1}
                id={-1}
                timestamp={this.props.timestamp}>
                {this.props.title}
            </Entry>
            {this.props.entries.map(this.renderEntry)}
            <div style={{
                overflow: "hidden",
                position: "fixed",
                height: 0,
                top: 0}}>
                {(this.props.focus) ? <textarea
                    onChange={this.dispatchEditEvent}
                    ref="textarea"
                    style={{outline: "none", width: "100%"}}
                    value={this.props.focus.text}>
                </textarea> : false}
            </div>
        </div>);
    }
});


module.exports = Document;
