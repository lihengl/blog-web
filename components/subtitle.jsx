"use strict";
var FocusAction = require("../actions/focus");

var React = require("react/addons");

var Subtitle = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        identity: React.PropTypes.number.isRequired,
        children: React.PropTypes.string.isRequired,
        leading:  React.PropTypes.number.isRequired
    },
    _handleClick: function (characterIndex) {
        FocusAction(characterIndex, this.props.children);
        return;
    },
    render: function () {
        var self = this;
        return <h2 style={{
            marginBottom: 0,
            marginTop: this.props.leading,
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
