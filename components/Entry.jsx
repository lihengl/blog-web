"use strict";
import React, { Component, PropTypes } from "react/addons";
import ajax from "superagent";


var EntryTypes = ["paragraph", "image", "subtitle"];

class Entry extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        type: PropTypes.oneOf(EntryTypes),
        text: PropTypes.string
      })
    ]).isRequired,
    cursor: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    width: PropTypes.number
  }
  dispatchResponse (err, response) {
    response = err || JSON.parse(response.text);
    window.dispatchEvent(new CustomEvent("response", {detail: response}));
  }
  dispatchLoading = () => {
    var repositories = "https://api.github.com/users/lihengl/repos";
    window.dispatchEvent(new CustomEvent("loading"));
    ajax.get(repositories).end(this.dispatchResponse);
  }
  dispatchFocus = (position) => {
    var children = this.props.children;
    var detail = {entry: this.props.id, position: position};
    detail.text = (this.props.id === -1) ? children : children.text;
    window.dispatchEvent(new CustomEvent("focus", {detail: detail}));
  }
  renderCharacter = (character, index) => {
    var second = Math.round(this.props.timestamp / 1000.0);
    var pointed = (index === this.props.cursor) && (second % 2 === 0);
    var bdcolor = (pointed) ? "#000000" : "transparent";
    console.info("PERFORMANCE HIT");
    return (<span key={index}
      onClick={this.dispatchFocus.bind(this, index)} style={{
      borderLeft: ["1px", "solid ", bdcolor].join(" "),
      borderRight: "1px solid transparent"}}>
      {character}
    </span>);
  }
  renderImage = () => {
    var children = this.props.children;
    return (<div style={{marginTop: 56, width: this.props.width}}>
      <div onClick={this.dispatchLoading} style={{
        backgroundColor: "#EFEFEF",
        backgroundImage: "url(" + children.url + ")",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: this.props.width,
        margin: "0 auto 0 auto"}}>
      </div>
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
  }
  renderSubTitle = () => {
    return (<h2 style={{
      letterSpacing: "-0.03em",
      marginBottom: 0,
      marginTop: 56,
      fontSize: 42}}>
      {this.props.children.text.split("").map(this.renderCharacter)}
    </h2>);
  }
  renderMainTitle = () => {
    return (<h1 style={{fontSize: 60, letterSpacing: "-0.02em"}}>
      {this.props.children.split("").map(this.renderCharacter)}
    </h1>);
  }
  renderParagraph = () => {
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
  }
  render () {
    var children = this.props.children;
    if (this.props.id === -1) { return this.renderMainTitle(); }
    if (!children) { return false; }
    if (children.type === EntryTypes[0]) { return this.renderParagraph(); }
    if (children.type === EntryTypes[1]) { return this.renderImage(); }
    if (children.type === EntryTypes[2]) { return this.renderSubTitle(); }
    return false;
  }
}

export default Entry;
