"use strict";
var FocusAction = require("../actions/focus");
var FetchAction = require("../actions/fetch");

var React = require("react/addons");

var Title = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    handleClick: function (characterIndex) {
        FetchAction("lihengl", true);
        FocusAction(characterIndex, this.props.children);
        return;
    },
    renderCharacter: function (character, index) {
        return (<span
            key={index}
            onClick={this.handleClick.bind(this, index)}>
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
