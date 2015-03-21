"use strict";
var CountStore   = require("../stores/count");

var React = require("react");


var Paper = React.createClass({
    _onChange: function () {
        this.setState({text: CountStore.getTotal()});
    },
    getInitialState: function () {
        return {text: CountStore.getTotal()};
    },
    componentDidMount: function () {
        CountStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        CountStore.removeChangeListener(this._onChange);
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
                <h1 style={{
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


module.exports = Paper;
