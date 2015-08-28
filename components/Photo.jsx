"use strict";
var React = require("react/addons");
var request = require("superagent");

var Photo = React.createClass({
    propTypes: {
        description: React.PropTypes.string,
        identity: React.PropTypes.number.isRequired,
        layout: React.PropTypes.string.isRequired,
        leading: React.PropTypes.number.isRequired,
        source: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    processResponse: function (err, response) {
        response = JSON.parse(response.text);
        window.dispatchEvent(new CustomEvent("response", {detail: response}));
    },
    requestRepos: function () {
        var api = "https://api.github.com/users/lihengl/repos";
        request.get(api).end(this.processResponse);
        window.dispatchEvent(new CustomEvent("loading"));
    },
    gainFocus: function (characterIndex) {
        window.dispatchEvent(new CustomEvent("focus", {detail: characterIndex}));
    },
    renderCharacter: function (character, index) {
        return (<span key={index} onClick={this.gainFocus.bind(this, index)}>
            {character}
        </span>);
    },
    render: function () {
        var imageStyle = {cursor: "pointer"};
        var hasText = (
            this.props.description &&
            this.props.description.length > 0
        );

        if (this.props.layout === "portrait") {
            imageStyle.height = this.props.width;
            imageStyle.width = "auto";
        } else {
            imageStyle.height = "auto";
            imageStyle.width = "100%";
        }

        return (<div style={{
            marginBottom: 0,
            marginTop: this.props.leading,
            textAlign: "center"}}>
            <div style={{
                backgroundColor: "#EFEFEF",
                fontSize: 0}}>
                <img onClick={this.loadMore} src={this.props.source} style={imageStyle}/>
            </div>
            {(!hasText) ? false : <div style={{
                marginBottom: 0,
                lineHeight: "20px",
                marginTop: 12,
                textAlign: "right",
                fontSize: 14}}>
                {this.props.description.split("").map(this.renderCharacter)}
            </div>}
        </div>);
    }
});

module.exports = Photo;
