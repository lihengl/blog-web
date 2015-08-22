"use strict";
var FocusAction = require("../actions/focus");
var React = require("react/addons");

var css = {
    letterSpacing: ".05em",
    fontFamily: "Georgia, serif",
    textAlign: "left",
    fontSize: 18
};

var Paragraph = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
        identity: React.PropTypes.number.isRequired,
        leading: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    getInitialState: function () {
        return {
            text: this.props.children,
            idle: false
        };
    },
    updateText: function (evt) {
        this.setState({text: evt.target.value});
    },
    gainFocus: function (characterIndex) {
        FocusAction(characterIndex, this.props.children);
        React.findDOMNode(this.refs.receiver).focus();
    },
    renderCharacter: function (character, index) {
        return (<span
            key={index}
            onClick={this.gainFocus.bind(this, index)}>
            {character}
        </span>);
    },
    render: function () {
        return (<div>
            <p style={Object.assign({
                marginBottom: 0,
                whiteSpace: "pre-wrap",
                lineHeight: ((this.props.leading / 2) + "px"),
                marginTop: this.props.leading,
                wordWrap: "break-word"}, css)}>
                {this.state.text.split("").map(this.renderCharacter)}
            </p>
            <div style={{overflow: "hidden", height: 0}}>
                <textarea
                    onChange={this.updateText}
                    ref="receiver"
                    style={Object.assign({outline: "none", width: "100%"}, css)}
                    value={this.state.text}>
                </textarea>
            </div>
        </div>);
    }
});

module.exports = Paragraph;
