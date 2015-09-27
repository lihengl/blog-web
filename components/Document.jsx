"use strict";
import React, { Component, PropTypes } from "react/addons";
import Entry from "./Entry.jsx";


class Document extends Component {
  static propTypes = {
    entries: PropTypes.arrayOf(PropTypes.object).isRequired,
    focus: PropTypes.shape({
      entry: PropTypes.number,
      position: PropTypes.number,
      text: PropTypes.string
    }),
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
  }
  static defaultProps = {
    focus: null
  }
  shouldComponentUpdate () {
    return false;
  }
  componentDidUpdate = () => {
    var textarea = React.findDOMNode(this.refs.textarea);
    var position = 0;
    if (!textarea) { return; }
    if (textarea === document.activeElement) { return; }
    position = this.props.focus.position;
    textarea.setSelectionRange(position, position);
    textarea.focus();
  }
  dispatchEditEvent (evt) {
    var detail = evt.target.value;
    window.dispatchEvent(new CustomEvent("edit", {detail: detail}));
  }
  renderEntry = (entry, index) => {
    var focus = this.props.focus;
    var active = (focus) ? (focus.entry === index) : false;
    return (<Entry
      cursor={(active) ? focus.position : -1}
      id={index}
      key={index}
      timestamp={this.props.timestamp}
      width={this.props.width}>
      {entry}
    </Entry>);
  }
  render () {
    var focus = this.props.focus;
    var active = (focus) ? (focus.entry === -1) : false;
    return (<div>
      <Entry
        cursor={(active) ? focus.position : -1}
        id={-1}
        timestamp={this.props.timestamp}>
        {this.props.title}
      </Entry>
      {this.props.entries.map(this.renderEntry)}
      <div style={{
        overflow: "hidden",
        position: "fixed",
        height: 0,
        top: 0}}>
        {(this.props.focus) ? <textarea
          onChange={this.dispatchEditEvent}
          ref="textarea"
          style={{outline: "none", width: "100%"}}
          value={this.props.focus.text}>
        </textarea> : false}
      </div>
    </div>);
  }
}


export default Document;
