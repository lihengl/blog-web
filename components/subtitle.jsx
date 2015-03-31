"use strict";
var FocusAction = require("../actions/focus");

var React = require("react");

var Subtitle = React.createClass({
    propTypes: {
        identity: React.PropTypes.number.isRequired,
        children: React.PropTypes.string.isRequired
    },
    _handleClick: function (characterIndex) {
        FocusAction(characterIndex, this.props.children);
        return;
    },
    render: function () {
        var self = this;
        return <h2 style={{
            marginBottom: 0,
            marginTop: 50,
            fontSize: 42}}>
            {this.props.children.split("").map(function (character, index) {
                return <span
                    onClick={self._handleClick.bind(self, index)}
                    key={index}>
                    {character}
                </span>;
            })}
        </h2>;
    }
});

module.exports = Subtitle;
