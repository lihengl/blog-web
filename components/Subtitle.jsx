"use strict";
var FocusAction = require("../actions/focus");

var React = require("react/addons");

var Subtitle = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired,
        identity: React.PropTypes.number.isRequired,
        leading:  React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    _handleClick: function (characterIndex) {
        FocusAction(characterIndex, this.props.children);
        return;
    },
    render: function () {
        var self = this;
        return (<h2 style={{
            marginBottom: 0,
            marginTop: this.props.leading,
            fontSize: 42}}>
            {this.props.children.split("").map(function (character, index) {
                return (<span
                    key={index}
                    onClick={self._handleClick.bind(self, index)}>
                    {character}
                </span>);
            })}
        </h2>);
    }
});

module.exports = Subtitle;
