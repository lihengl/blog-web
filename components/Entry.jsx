"use strict";
var React = require("react/addons");
var request = require("superagent");


var Entry = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.shape({
                type: React.PropTypes.oneOf([
                    "paragraph",
                    "photo",
                    "subtitle"
                ]),
                text: React.PropTypes.string
            })
        ]).isRequired,
        id: React.PropTypes.number.isRequired,
        width: React.PropTypes.number
    },
    mixins: [React.addons.PureRenderMixin],
    dispatchResponseEvent: function (err, response) {
        response = JSON.parse(response.text);
        window.dispatchEvent(new CustomEvent("response", {detail: response}));
    },
    dispatchLoadingEvent: function () {
        var api = "https://api.github.com/users/lihengl/repos";
        request.get(api).end(this.dispatchResponseEvent);
        window.dispatchEvent(new CustomEvent("loading"));
    },
    dispatchFocusEvent: function (position) {
        var detail = {entry: this.props.id, position: position};
        detail.text = (this.props.id === -1) ? this.props.children : this.props.children.text;
        window.dispatchEvent(new CustomEvent("focus", {detail: detail}));
    },
    renderCharacter: function (character, index) {
        return (<span key={index} onClick={this.dispatchFocusEvent.bind(this, index)}>
            {character}
        </span>);
    },
    renderImg: function () {
        var style = {cursor: "pointer", display: "block", margin: "0 auto 0 auto"};

        if (this.props.children.orientation === "portrait") {
            style.height = this.props.width;
            style.width = "auto";
        } else {
            style.height = "auto";
            style.width = "100%";
        }

        return (<div style={{marginTop: 56, width: this.props.width}}>
            <div style={{backgroundColor: "#EFEFEF"}}><img
                onClick={this.dispatchLoadingEvent}
                src={this.props.children.url}
                style={style}
            /></div>
            {(this.props.children.text && this.props.children.text.length > 0) ? <div style={{
                marginBottom: 0,
                lineHeight: "20px",
                marginTop: 12,
                textAlign: "right",
                fontSize: 14}}>
                {this.props.children.text.split("").map(this.renderCharacter)}
            </div> : false}
        </div>);
    },
    renderH2: function () {
        return (<h2 style={{marginBottom: 0, marginTop: 56, fontSize: 42}}>
            {this.props.children.text.split("").map(this.renderCharacter)}
        </h2>);
    },
    renderH1: function () {
        return (<h1 style={{fontSize: 60}}>
            {this.props.children.split("").map(this.renderCharacter)}
        </h1>);
    },
    renderP: function () {
        var marginTop = 56;
        return (<p style={{
            fontFamily: "Georgia, serif",
            fontSize: 18,
            letterSpacing: ".05em",
            lineHeight: ((marginTop / 2) + "px"),
            marginBottom: 0,
            marginTop: marginTop,
            textAlign: "left",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap"}}>
            {this.props.children.text.split("").map(this.renderCharacter)}
        </p>);
    },
    render: function () {
        if (this.props.id === -1) { return this.renderH1(); }
        if (!this.props.children) { return false; }
        if (this.props.children.type === "paragraph") { return this.renderP(); }
        if (this.props.children.type === "subtitle") { return this.renderH2(); }
        if (this.props.children.type === "photo") { return this.renderImg(); }
        return false;
    }
});

module.exports = Entry;
