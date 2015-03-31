"use strict";
var React = require("react");

var Photo = React.createClass({
    propTypes: {
        footnote: React.PropTypes.string,
        layout:   React.PropTypes.string.isRequired,
        source:   React.PropTypes.string.isRequired,
        width:    React.PropTypes.number.isRequired
    },
    render: function () {
        var imageStyle = {cursor: "pointer"};
        var noted = (this.props.footnote && this.props.footnote.length > 0);

        if (this.props.layout === "portrait") {
            imageStyle.height = this.props.width;
            imageStyle.width = "auto";
        } else {
            imageStyle.height = "auto";
            imageStyle.width = "100%";
        }

        return <div style={{
            marginBottom: 0,
            marginTop: 50,
            textAlign: "center"}}>
            <div style={{
                backgroundColor: "#EFEFEF",
                fontSize: 0}}>
                <img src={this.props.source} style={imageStyle}/>
            </div>
            {(!noted) ? false : <p style={{
                marginBottom: 0,
                lineHeight: "20px",
                marginTop: 12,
                textAlign: "right",
                fontSize: 14}}>
                {this.props.footnote}
            </p>}
        </div>;
    }
});

module.exports = Photo;
