"use strict";
var React = require("react/addons");
var Request = require("superagent");


var EntryTypes = ["paragraph", "image", "subtitle"];

var Entry = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.shape({
                type: React.PropTypes.oneOf(EntryTypes),
                text: React.PropTypes.string
            })
        ]).isRequired,
        cursor: React.PropTypes.number.isRequired,
        id: React.PropTypes.number.isRequired,
        timestamp: React.PropTypes.number.isRequired,
        width: React.PropTypes.number
    },
    mixins: [React.addons.PureRenderMixin],
    dispatchResponse: function (err, response) {
        response = err || JSON.parse(response.text);
        window.dispatchEvent(new CustomEvent("response", {detail: response}));
    },
    dispatchLoading: function () {
        var repositories = "https://api.github.com/users/lihengl/repos";
        Request.get(repositories).end(this.dispatchResponse);
        window.dispatchEvent(new CustomEvent("loading"));
    },
    dispatchFocus: function (position) {
        var children = this.props.children;
        var detail = {entry: this.props.id, position: position};
        detail.text = (this.props.id === -1) ? children : children.text;
        window.dispatchEvent(new CustomEvent("focus", {detail: detail}));
    },
    renderCharacter: function (character, index) {
        var second = Math.round(this.props.timestamp / 1000.0);
        var pointed = (index === this.props.cursor) && (second % 2 === 0);
        var bdcolor = (pointed) ? "#000000" : "transparent";
        return (<span key={index}
            onClick={this.dispatchFocus.bind(this, index)} style={{
            borderLeft: ["1px", "solid ", bdcolor].join(" "),
            borderRight: "1px solid transparent"}}>
            {character}
        </span>);
    },
    renderImage: function () {
        var children = this.props.children;
        var style = {display: "block", margin: "0 auto 0 auto"};

        if (children.orientation === "portrait") {
            style.height = this.props.width;
            style.width = "auto";
        } else {
            style.height = "auto";
            style.width = "100%";
        }

        return (<div style={{marginTop: 56, width: this.props.width}}>
            <div style={{backgroundColor: "#EFEFEF"}}><img
                onClick={this.dispatchLoading}
                src={children.url}
                style={style}
            /></div>
            {(children.text && children.text.length > 0) ? <div style={{
                fontSize: 14,
                letterSpacing: "-0.1em",
                lineHeight: "20px",
                marginBottom: 0,
                marginTop: 12,
                textAlign: "right"}}>
                {children.text.split("").map(this.renderCharacter)}
            </div> : false}
        </div>);
    },
    renderSubTitle: function () {
        return (<h2 style={{
            letterSpacing: "-0.03em",
            marginBottom: 0,
            marginTop: 56,
            fontSize: 42}}>
            {this.props.children.text.split("").map(this.renderCharacter)}
        </h2>);
    },
    renderMainTitle: function () {
        return (<h1 style={{fontSize: 60, letterSpacing: "-0.02em"}}>
            {this.props.children.split("").map(this.renderCharacter)}
        </h1>);
    },
    renderParagraph: function () {
        var marginTop = 56;
        return (<p style={{
            fontFamily: "Georgia, serif",
            fontSize: 18,
            letterSpacing: "-0.07em",
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
        var children = this.props.children;
        if (this.props.id === -1) { return this.renderMainTitle(); }
        if (!children) { return false; }
        if (children.type === EntryTypes[0]) { return this.renderParagraph(); }
        if (children.type === EntryTypes[1]) { return this.renderImage(); }
        if (children.type === EntryTypes[2]) { return this.renderSubTitle(); }
        return false;
    }
});

module.exports = Entry;
