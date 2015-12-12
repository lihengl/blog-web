import React, { Component, PropTypes } from 'react';
import ReactShallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';


class LineGraph extends Component {
  static propTypes = {
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    }).isRequired
  }
  componentDidMount = () => {
    var canvasSize = this.rootElement.getBoundingClientRect();
    var mountEvent = new CustomEvent('graph-mount', {detail: canvasSize});
    this.rootElement.dispatchEvent(mountEvent);
  }
  shouldComponentUpdate = (nextProps) => {
    return ReactShallowCompare(this.props, nextProps);
  }
  renderPixelRow = (columnIndex, rowIndex) => {
    return (<span key={columnIndex + '-' + rowIndex}>{'.'}</span>);
  }
  render () {
    return (<div ref={(ref) => this.rootElement = ref} style={{
      border: '1px solid #ccc'}}>
      {_.range(5).map(this.renderPixelRow)}
    </div>);
  }
}


export default LineGraph;
