/* eslint-env browser */
import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import _ from 'lodash';

import Dashboard from './Dashboard.jsx';
import Document from './Document.jsx';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

class Application extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    focus: PropTypes.object,
    height: PropTypes.number.isRequired,
    scroll: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    user: PropTypes.shape({
      alias: PropTypes.string.isRequired,
      id: PropTypes.number
    }).isRequired,
    width: PropTypes.number.isRequired
  }
  static defaultProps = {
    focus: null,
    timestamp: 0
  }
  constructor (props) {
    super(props);
    this.intervals = [];
    this.state = this.props;
  }
  componentDidMount = () => {
    this.intervals.push(setInterval(this.handleInterval, 1000));
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('response', this.handleResponse);
    window.addEventListener('loading', this.handleLoading);
    window.addEventListener('focus', this.handleFocus);
    window.addEventListener('edit', this.handleEdit);
  }
  componentWillUnmount = () => {
    window.removeEventListener('edit', this.handleEdit);
    window.removeEventListener('focus', this.handleFocus);
    window.removeEventListener('loading', this.handleLoading);
    window.removeEventListener('response', this.handleResponse);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
    this.intervals.map(clearInterval);
  }
  handleLoading = () => {
    this.setState(update(this.state, {
      blog: {tagline: {$set: 'Loading...'}}
    }));
  }
  handleFocus = (evt) => {
    this.setState(update(this.state, {
      focus: {$set: evt.detail}
    }));
  }
  handleResponse = (evt) => {
    this.setState(update(this.state, {
      blog: {tagline: {$set: _.pluck(evt.detail, 'name').join(', ')}}
    }));
  }
  handleEdit = (evt) => {
    var id = this.state.focus.entry;
    var mutation = (id < 0) ? {title: {$set: evt.detail}} : {
      entries: {[id]: {text: {$set: evt.detail}}}
    };
    this.setState(update(this.state, {
      article: mutation,
      focus: {text: {$set: evt.detail}}
    }));
  }
  handleScroll = () => {
    this.setState(update(this.state, {
      scroll: {$set: window.scrollY}
    }));
  }
  handleInterval = () => {
    this.setState(update(this.state, {
      timestamp: {$set: Date.now()}
    }));
  }
  handleResize = () => {
    this.setState(update(this.state, {
      height: {$set: window.innerHeight},
      width: {$set: window.innerWidth}
    }));
  }
  renderBody = (width) => {
    var body = null;

    if (this.state.article) {
      body = (<Document {...this.state.article}
        focus={this.state.focus}
        timestamp={this.state.timestamp}
        width={width}
      />);
    } else if (this.state.user && this.state.blog) {
      body = <Dashboard />;
    } else {
      body = (<div style={{color: '#FF0000'}}>
        {'Unexpected Application state: ' + this.state}
      </div>);
    }

    return body;
  }
  render () {
    var width = Math.min(680, this.state.width) - (10 * 2);
    return (<div style={{
      fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", sans-serif',
      color: '#333333'}}>
      <Header
        blog={this.state.blog}
        height={this.state.height}
        width={this.state.width}/>
      <div style={{
        padding: '20px 10px 20px 10px',
        margin: '0 auto 0 auto',
        width: width}}>
        {this.renderBody(width)}
      </div>
      <Footer
        author={this.state.user.alias}
        timestamp={this.state.timestamp}/>
    </div>);
  }
}

export default Application;
