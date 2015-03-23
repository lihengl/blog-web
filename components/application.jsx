"use strict";
var React = require("react");

var Canvas = require("./canvas");
var Cover  = require("./cover");

var Application = React.createClass({
    _adjustSize: function () {
        this.setState({
            height: window.innerHeight,
            width:  window.innerWidth
        });
        return;
    },
    getInitialState: function () {
        return {
            height: 900,
            width: 1440
        };
    },
    componentDidMount: function () {
        window.addEventListener("resize", this._adjustSize);
        return;
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this._adjustSize);
        return;
    },
    render: function () {
        return <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, 'Segoe UI', Arial, sans-serif",
            color: "#333333"}}>
            <Cover height={this.state.height} width={this.state.width}>
                {this.props.title}
            </Cover>
            <Canvas width={this.state.width} title="A Blog Post's Title" />
        </div>;
    }
});

module.exports = Application;
