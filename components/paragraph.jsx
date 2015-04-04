"use strict";
var FocusAction = require("../actions/focus");
var React = require("react/addons");

var FONT = {
    SPACING: ".05em",
    FAMILY: "Georgia, serif",
    ALIGN: "left",
    SIZE: 18
};

var Paragraph = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        identity: React.PropTypes.number.isRequired,
        children: React.PropTypes.string.isRequired,
        leading:  React.PropTypes.number.isRequired
    },
    getInitialState: function () {
        return {
            text: this.props.children,
            idle: false
        };
    },
    _handleMouseEnter: function () {
        console.log("FFG");
        if (this.state.idle === true) { return; }
        this.setState({
            text: this.state.text,
            idle: true
        });
        return;
    },
    _handleTyping: function (evt) {
        this.setState({
            text: evt.target.value,
            idle: false
        });
        return;
    },
    _handleClick: function (characterIndex) {
        FocusAction(characterIndex, this.props.children);
        React.findDOMNode(this.refs.receiver).focus();
        return;
    },
    _renderText: function () {
        var self = this;
        if (this.state.idle === false) { return this.state.text; }
        return this.state.text.split("").map(function (character, index) {
            return <span
                onClick={self._handleClick.bind(self, index)}
                key={index}>
                {character}
            </span>;
        });
    },
    render: function () {
        return <div>
            <p onMouseEnter={this._handleMouseEnter} style={{
                letterSpacing: FONT.SPACING,
                marginBottom: 0,
                fontFamily: FONT.FAMILY,
                whiteSpace: "pre-wrap",
                lineHeight: ((this.props.leading / 2) + "px"),
                textAlign: FONT.ALIGN,
                marginTop: this.props.leading,
                wordWrap: "break-word",
                fontSize: FONT.SIZE}}>
                {this._renderText()}
            </p>
            <div style={{
                overflow: "hidden",
                height: 0}}>
                <textarea
                    onChange={this._handleTyping}
                    value={this.state.text}
                    style={{
                        letterSpacing: FONT.SPACING,
                        fontFamily: FONT.FAMILY,
                        textAlign: FONT.ALIGN,
                        fontSize: FONT.SIZE,
                        outline: "none",
                        width: "100%"
                    }}
                    ref="receiver">
                </textarea>
            </div>
        </div>;
    }
});

module.exports = Paragraph;
