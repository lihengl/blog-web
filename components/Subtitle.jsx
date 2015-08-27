"use strict";
var React = require("react/addons");

var Subtitle = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
        identity: React.PropTypes.number.isRequired,
        leading: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    gainFocus: function (characterIndex) {
        window.dispatchEvent(new CustomEvent("focus", {detail: characterIndex}));
    },
    renderCharacter: function (character, index) {
        return (<span key={index} onClick={this.gainFocus.bind(this, index)}>
            {character}
        </span>);
    },
    render: function () {
        return (<h2 style={{
            marginBottom: 0,
            marginTop: this.props.leading,
            fontSize: 42}}>
            {this.props.children.split("").map(this.renderCharacter)}
        </h2>);
    }
});

module.exports = Subtitle;
