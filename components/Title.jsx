"use strict";
var React = require("react/addons");

var Title = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired
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
        return (<h1 style={{fontSize: 60}}>
            {this.props.children.split("").map(this.renderCharacter)}
        </h1>);
    }
});

module.exports = Title;
