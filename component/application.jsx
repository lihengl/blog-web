"use strict";
var React = require("react");

var Cover = require("./cover");
var Paper = require("./paper");

var Application = React.createClass({
    _captureBrowserSize: function () {
        this.setState({
            browser: {height: window.innerHeight, width: window.innerWidth}
        });
        return;
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this._captureBrowserSize);
        return;
    },
    componentDidMount: function () {
        window.addEventListener("resize", this._captureBrowserSize);
        return;
    },
    getInitialState: function () {
        return {
            browser: {height: 900, width: 1440}
        };
    },
    render: function () {
        return <div>
            <Cover browser={this.state.browser}>{this.props.title}</Cover>
            <Paper browser={this.state.browser} title="A Blog Post's Title" />
        </div>;
    }
});

module.exports = Application;
