"use strict";
var FocusAction = require("../actions/focus");
var FetchAction = require("../actions/fetch");

var React = require("react");

var Title = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired
    },
    _handleClick: function (characterIndex) {
        FetchAction("lihengl", true);
        FocusAction(characterIndex, this.props.children);
        return;
    },
    render: function () {
        var self = this;
        return <h1 style={{fontSize: 60}}>
            {this.props.children.split("").map(function (character, index) {
                return <span
                    onClick={self._handleClick.bind(self, index)}
                    key={index}>
                    {character}
                </span>;
            })}
        </h1>;
    }
});

module.exports = Title;
