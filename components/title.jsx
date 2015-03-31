"use strict";
var FetchAction = require("../actions/fetch");

var React = require("react");

var Title = React.createClass({
    propTypes: {
        children: React.PropTypes.string.isRequired
    },
    _handleClick: function () {
        FetchAction("lihengl", true);
        return;
    },
    render: function () {
        return <h1 style={{
            fontSize: 60
        }} onClick={this._handleClick}>
            {this.props.children}
        </h1>;
    }
});

module.exports = Title;
