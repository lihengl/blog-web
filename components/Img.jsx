"use strict";
var React = require("react/addons");
var request = require("superagent");

var Img = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        orientation: React.PropTypes.string.isRequired,
        text: React.PropTypes.string,
        url: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    processResponse: function (err, response) {
        response = JSON.parse(response.text);
        window.dispatchEvent(new CustomEvent("response", {detail: response}));
    },
    sendRequest: function () {
        var api = "https://api.github.com/users/lihengl/repos";
        request.get(api).end(this.processResponse);
        window.dispatchEvent(new CustomEvent("loading"));
    },
    dispatchFocusEvent: function (position) {
        var detail = {entry: this.props.id, position: position, text: this.props.text};
        window.dispatchEvent(new CustomEvent("focus", {detail: detail}));
    },
    renderCharacter: function (character, index) {
        return (<span key={index} onClick={this.dispatchFocusEvent.bind(this, index)}>
            {character}
        </span>);
    },
    render: function () {
        var imageStyle = {cursor: "pointer", display: "block", margin: "0 auto 0 auto"};
        var hasText = (
            this.props.text &&
            this.props.text.length > 0
        );

        if (this.props.orientation === "portrait") {
            imageStyle.height = this.props.width;
            imageStyle.width = "auto";
        } else {
            imageStyle.height = "auto";
            imageStyle.width = "100%";
        }

        return (<div style={{marginTop: 56, width: this.props.width}}>
            <div style={{backgroundColor: "#EFEFEF"}}>
                <img onClick={this.sendRequest} src={this.props.url} style={imageStyle}/>
            </div>
            {(this.props.text && this.props.text.length > 0) ? <div style={{
                marginBottom: 0,
                lineHeight: "20px",
                marginTop: 12,
                textAlign: "right",
                fontSize: 14}}>
                {this.props.text.split("").map(this.renderCharacter)}
            </div> : false}
        </div>);
    }
});

module.exports = Img;
