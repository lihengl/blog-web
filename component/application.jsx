"use strict";
var React = require("react");

var Cover = require("./cover");

var Application = React.createClass({
    updateScreenWidth: function () {
        this.setState({content: window.innerWidth});
        return;
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.updateScreenWidth);
        return;
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.updateScreenWidth);
        return;
    },
    getInitialState: function () {
        return {content: "Hello, world?"};
    },
    render: function () {
        return <div>
            <Cover>{this.props.title}</Cover>
            <p>{this.state.content}</p>
        </div>;
    }
});

module.exports = Application;
