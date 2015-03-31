"use strict";
var FocusAction = require("../actions/focus");
var React = require("react");

var Paragraph = React.createClass({
    propTypes: {
        identity: React.PropTypes.number.isRequired,
        children: React.PropTypes.string.isRequired
    },
    getInitialState: function () {
        return {text: this.props.children};
    },
    _handleChange: function (evt) {
        var state = this.state;
        this.state.text = evt.target.value;
        this.setState(state);
        return;
    },
    _handleClick: function (characterIndex) {
        FocusAction(characterIndex, this.props.children);
        React.findDOMNode(this.refs.editor).focus();
        return;
    },
    render: function () {
        var self = this;
        return <div>
            <div style={{
                overflow: "hidden",
                height: 0}}>
                <textarea
                    onChange={this._handleChange}
                    style={{outline: "none"}}
                    value={this.state.text}
                    type="text"
                    ref="editor">
                </textarea>
            </div>
            <p style={{
                letterSpacing: ".05em",
                marginBottom: 0,
                fontFamily: "Georgia, serif",
                whiteSpace: "pre-wrap",
                lineHeight: "27px",
                textAlign: "left",
                marginTop: 50,
                fontSize: 18}}>
                {this.state.text.split("").map(function (character, index) {
                    return <span
                        onClick={self._handleClick.bind(self, index)}
                        key={index}>
                        {character}
                    </span>;
                })}
            </p>
        </div>;
    }
});

module.exports = Paragraph;
