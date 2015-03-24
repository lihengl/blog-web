"use strict";
var Fetch = require("../actions/fetch");
var Count = require("../stores/count");

var React = require("react");


var Canvas = React.createClass({
    _handleChange: function () {
        this.setState({
            text: Count.getTotal()
        });
        return;
    },
    _handleClick: function () {
        Fetch.comments("lihengl", true);
        return;
    },
    componentWillUnmount: function () {
        Count.removeChangeListener(this._handleChange);
        return;
    },
    componentDidMount: function () {
        Count.addChangeListener(this._handleChange);
        return;
    },
    getInitialState: function () {
        return {
            text: Count.getTotal()
        };
    },
    render: function () {
        var paddingSide = 10;
        var maxWidth = 680;
        var width = (this.props.width > maxWidth) ? maxWidth : this.props.width;

        return <div>
            <div style={{
                paddingBottom: 20,
                paddingRight: paddingSide,
                paddingLeft: paddingSide,
                paddingTop: 20,
                margin: "0 auto 0 auto",
                width: width - (paddingSide * 2)}}>
                <h1 onClick={this._handleClick} style={{
                    fontSize: 40}}>
                    {this.props.title}
                </h1>
                <p style={{
                    lineHeight: "1.8em",
                    wordWrap: "break-word"}}>
                    {this.state.text}
                </p>
            </div>
        </div>;
    }
});


module.exports = Canvas;
