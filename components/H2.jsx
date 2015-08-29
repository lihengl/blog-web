"use strict";
var React = require("react/addons");

var H2 = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
        id: React.PropTypes.number.isRequired
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
        return (<h2 style={{marginBottom: 0, marginTop: 56, fontSize: 42}}>
            {this.props.children.split("").map(this.renderCharacter)}
        </h2>);
    }
});

module.exports = H2;
