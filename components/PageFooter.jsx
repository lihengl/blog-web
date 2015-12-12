import React, { Component, PropTypes } from 'react';


class PageFooter extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    yearNumber: PropTypes.number.isRequired
  }
  render () {
    return (<div style={{
      borderTop: '1px solid #ddd',
      fontSize: 12,
      margin: '100px 0 0 0',
      padding: '50px 0 50px 0',
      textAlign: 'center'}}>
      <div>{[this.props.yearNumber, this.props.userName].join(' © ')}</div>
    </div>);
  }
}


export default PageFooter;
