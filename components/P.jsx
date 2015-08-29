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
    dispatchFocusEvent: function (position) {
        var detail = {entry: this.props.id, position: position, text: this.props.children};
        window.dispatchEvent(new CustomEvent("focus", {detail: detail}));
    },
    renderCharacter: function (character, index) {
        return (<span key={index} onClick={this.dispatchFocusEvent.bind(this, index)}>
            {character}
        </span>);
    },
    render: function () {
        var marginTop = 56;
        return (<p style={Object.assign({
            marginBottom: 0,
            whiteSpace: "pre-wrap",
            lineHeight: ((marginTop / 2) + "px"),
            marginTop: marginTop,
            wordWrap: "break-word"}, Style)}>
            {this.props.children.split("").map(this.renderCharacter)}
        </p>);
    }
});

module.exports = P;
