"use strict";
var React = require("react/addons");

var Style = {
    letterSpacing: ".05em",
    fontFamily: "Georgia, serif",
    textAlign: "left",
    fontSize: 18
};

var P = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    updateText: function (evt) {
        var payload = {entryId: this.props.id, text: evt.target.value};
        window.dispatchEvent(new CustomEvent("text", {detail: payload}));
    },
    gainFocus: function (characterIndex) {
        window.dispatchEvent(new CustomEvent("focus", {detail: characterIndex}));
        React.findDOMNode(this.refs.receiver).focus();
    },
    renderCharacter: function (character, index) {
        return (<span key={index} onClick={this.gainFocus.bind(this, index)}>
            {character}
        </span>);
    },
    render: function () {
        var marginTop = 56;
        return (<div>
            <p style={Object.assign({
                marginBottom: 0,
                whiteSpace: "pre-wrap",
                lineHeight: ((marginTop / 2) + "px"),
                marginTop: marginTop,
                wordWrap: "break-word"}, Style)}>
                {this.props.children.split("").map(this.renderCharacter)}
            </p>
            <div style={{overflow: "hidden", height: 0}}>
                <textarea
                    onChange={this.updateText}
                    ref="receiver"
                    style={Object.assign({outline: "none", width: "100%"}, Style)}
                    value={this.props.children}>
                </textarea>
            </div>
        </div>);
    }
});

module.exports = P;
