"use strict";
var React = require("react");

var Cover = require("./cover");
var Paper = require("./paper");

var Application = React.createClass({
    getInitialState: function () {
        return {
            height: 900,
            width: 1440
        };
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this._captureBrowserSize);
        return;
    },
    componentDidMount: function () {
        window.addEventListener("resize", this._captureBrowserSize);
        return;
    },
    _captureBrowserSize: function () {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
        return;
    },
    render: function () {
        return <div>
            <Cover height={this.state.height} width={this.state.width}>{this.props.title}</Cover>
            <Paper width={this.state.width} title="A Blog Post's Title" />
        </div>;
    }
});

module.exports = Application;
