"use strict";
var React = require("react");

var Cover = require("./cover");
var Paper = require("./paper");

var Application = React.createClass({
    captureScreenSize: function () {
        this.setState({
            height: window.innerHeight,
            width:  window.innerWidth
        });
        return;
    },
    getInitialState: function () {
        return {width: "Default Screen Width From Our Server"};
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.captureScreenSize);
        return;
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.captureScreenSize);
        return;
    },
    render: function () {
        return <div>
            <Cover width={this.state.width}>{this.props.title}</Cover>
            <Paper title="A Blog Post's Title" />
        </div>;
    }
});

module.exports = Application;
