"use strict";
var React = require("react");

var Paper = React.createClass({
    render: function () {
        return <div>
            <div style={{
                padding: "20px 30px 20px 30px",
                margin: "0 auto 0 auto",
                width: "640px"}}>
                <h1 style={{
                    fontSize: "40px"}}>
                    {this.props.title}
                </h1>
                <p>A blog post's very first paragraph is here.</p>
            </div>
        </div>;
    }
});

module.exports = Paper;
