import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import PageFooter from './PageFooter.jsx';
import PageHeader from './PageHeader.jsx';

import ContentEntry from './ContentEntry.jsx';


class ArticlePage extends Component {
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
  constructor (props) {
    super(props);
    this.state = this.props;
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }
  componentDidUpdate = () => {
    var textarea = ReactDOM.findDOMNode(this.refs.textarea);
    var position = 0;
    if (!textarea) { return; }
    if (textarea === document.activeElement) { return; }
    position = this.props.focus.position;
    textarea.setSelectionRange(position, position);
    textarea.focus();
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }
  dispatchEditEvent = (evt) => {
    var detail = evt.target.value;
    window.dispatchEvent(new CustomEvent('edit', {detail: detail}));
  }
  renderContentEntry = (entry, index) => {
    var focus = this.props.focus;
    var active = (focus) ? (focus.entry === index) : false;
    var width = Math.min(680, this.state.width) - (10 * 2);

    return (<ContentEntry
      cursor={(active) ? focus.position : -1}
      id={index}
      key={index}
      timestamp={this.state.timestamp}
      width={width}>
      {entry}
    </ContentEntry>);
  }
  render () {
    var focus = this.state.focus;
    var active = (focus) ? (focus.entry === -1) : false;
    var width = Math.min(680, this.state.width) - (10 * 2);

    return (<div>
      <PageHeader
        backgroundImageUrl={this.state.blog.cover}
        height={this.state.height}
        subtitle={this.state.blog.tagline}
        title={this.state.blog.name}
        width={this.state.width}/>
      <div style={{
        padding: '20px 10px 20px 10px',
        margin: '0 auto 0 auto',
        width: width}}>
        <ContentEntry
          cursor={(active) ? focus.position : -1}
          id={-1}
          timestamp={this.state.timestamp}>
          {this.state.title}
        </ContentEntry>
        {this.state.entries.map(this.renderContentEntry)}
        <div style={{
          overflow: 'hidden',
          position: 'fixed',
          height: 0,
          top: 0}}>
          {(this.state.focus) ? <textarea
            onChange={this.dispatchEditEvent}
            ref="textarea"
            style={{outline: 'none', width: '100%'}}
            value={this.state.focus.text}>
          </textarea> : false}
        </div>
      </div>
      <PageFooter
        userName={this.state.user.alias}
        yearNumber={2015}/>
    </div>);
  }
}


export default ArticlePage;
