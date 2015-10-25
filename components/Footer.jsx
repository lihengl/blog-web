/* eslint-env browser */
import React, { Component, PropTypes } from 'react';

class Footer extends Component {
  static propTypes = {
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
  }
  render () {
    var year = (new Date(this.props.timestamp)).getFullYear();
    return (<div style={{
      borderTop: '1px solid #DDDDDD',
      fontSize: 12,
      margin: '100px 0 0 0',
      padding: '50px 0 50px 0',
      textAlign: 'center'}}>
      <div>{[year, this.props.author].join(' © ')}</div>
    </div>);
  }
}

export default Footer;
