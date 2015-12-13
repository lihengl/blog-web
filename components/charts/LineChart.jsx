import React, { Component, PropTypes } from 'react';
import ReactShallowCompare from 'react-addons-shallow-compare';
import _ from 'lodash';


class LineChart extends Component {
  static propTypes = {
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    gmvPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    smtPoints: PropTypes.arrayOf(PropTypes.number).isRequired
  }
  componentDidMount = () => {
    var context = this.canvas.getContext('2d');
    context.font = 'normal 10pt "Helvetica Neue"';
    context.lineWidth = 1;
    this.renderChart();
  }
  shouldComponentUpdate = (nextProps) => {
    return ReactShallowCompare(this.props, nextProps);
  }
  compomentDidUpdate = () => {
    this.renderChart();
  }
  clearCanvas = () => {
    var context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);
  }
  getXAnchors = () => {
    var resolution = this.props.gmvPoints.length;
    var horiPads = (this.props.canvasWidth % resolution);
    var horiUnit = (this.props.canvasWidth - horiPads) / resolution;
    return _.range((horiPads / 2.0), this.props.canvasWidth, horiUnit);
  }
  getYAnchors = () => {
    var resolution = this.props.gmvPoints.length;
    var vertPads = (this.props.canvasHeight % resolution);
    var vertUnit = (this.props.canvasHeight - vertPads) / resolution;
    return _.range((vertPads / 2.0), this.props.canvasHeight, vertUnit);
  }
  renderBlackDot = (xCoordinate, yCoordinate) => {
    var context = this.canvas.getContext('2d');
    var xPosition = xCoordinate - 0.5;
    var yPosition = yCoordinate - 0.5;
    context.beginPath();
    context.arc(xPosition, yPosition, 2, 0, 2 * Math.PI, false);
    context.strokeStyle = '#000';
    context.fillStyle = '#000';
    context.fill();
    context.stroke();
  }
  renderCursorLine = (cursorCoordinate) => {
    var context = this.canvas.getContext('2d');
    var xPosition = cursorCoordinate.x - 0.5;
    context.beginPath();
    context.moveTo(xPosition, 0);
    context.lineTo(xPosition, this.props.canvasHeight);
    context.strokeStyle = '#333';
    context.setLineDash([5, 4]);
    context.stroke();
    context.setLineDash([]);
  }
  renderChart = (evt) => {
    var rect = this.canvas.getBoundingClientRect();
    var cursorCoordinate = (evt) ? {
      x: (evt.clientX - rect.left),
      y: (evt.clientY - rect.top)
    } : {x: -1, y: 0};

    this.clearCanvas();

    this.renderGridLines();
    this.renderDataPath(this.props.gmvPoints, '#4aadd5');
    this.renderDataPath(this.props.smtPoints, '#e38f46');

    if (cursorCoordinate.y > this.props.canvasHeight) { return; }
    if (cursorCoordinate.y < 1) { return; }

    this.renderCursorLine(cursorCoordinate);
    this.renderIntersection(cursorCoordinate.x, this.props.gmvPoints);
    this.renderIntersection(cursorCoordinate.x, this.props.smtPoints);
  }
  renderDataLine = (dataPoint, dataIndex) => {
    var context = this.canvas.getContext('2d');
    var xPosition = this.getXAnchors()[dataIndex] - 0.5;
    var yPosition = Math.round(dataPoint) - 0.5;

    if (dataIndex === 0) {
      context.beginPath();
      context.moveTo(xPosition, yPosition);
    } else if (dataIndex === this.getXAnchors().length - 1) {
      context.lineTo(xPosition, yPosition);
      context.stroke();
    } else {
      context.lineTo(xPosition, yPosition);
    }
  }
  renderDataPath = (dataPoints, pointColor) => {
    var context = this.canvas.getContext('2d');
    context.strokeStyle = pointColor;
    context.fillStyle = pointColor;
    dataPoints.forEach(this.renderDataPoint);
    dataPoints.forEach(this.renderDataLine);
  }
  renderDataPoint = (dataPoint, dataIndex) => {
    var context = this.canvas.getContext('2d');
    var xPosition = this.getXAnchors()[dataIndex] - 0.5;
    var yPosition = Math.round(dataPoint) - 0.5;
    context.beginPath();
    context.arc(xPosition, yPosition, 2, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
  }
  renderIntersection = (cursorXCoordinate, dataPoints) => {
    var largerFilter = xAnchor => (xAnchor > cursorXCoordinate);
    var allXAnchors = this.getXAnchors();
    var upperIndex = _.findIndex(allXAnchors, largerFilter);
    var lowerIndex = upperIndex - 1;
    var yCoordinate = 0;

    if (upperIndex < 1) { return; }

    yCoordinate += (dataPoints[upperIndex] - dataPoints[lowerIndex]);
    yCoordinate *= (cursorXCoordinate - allXAnchors[lowerIndex]);
    yCoordinate /= (allXAnchors[upperIndex] - allXAnchors[lowerIndex]);
    yCoordinate += (dataPoints[lowerIndex]);

    this.renderBlackDot(cursorXCoordinate, yCoordinate);
  }
  renderLatitudeLine = (yCoordinate) => {
    var context = this.canvas.getContext('2d');
    var yPosition = yCoordinate - 0.5;
    context.beginPath();
    context.moveTo(0, yPosition);
    context.lineTo(this.props.canvasWidth, yPosition);
    context.stroke();
  }
  renderLongitudeLine = (xCoordinate) => {
    var context = this.canvas.getContext('2d');
    var xPosition = xCoordinate - 0.5;
    context.beginPath();
    context.moveTo(xPosition, 0);
    context.lineTo(xPosition, this.props.canvasHeight);
    context.stroke();
  }
  renderGridLines = () => {
    var context = this.canvas.getContext('2d');
    context.strokeStyle = '#ddd';
    context.fillStyle = '#333';
    this.getXAnchors().forEach(this.renderLongitudeLine);
    this.getYAnchors().forEach(this.renderLatitudeLine);
  }
  render = () => {
    return (<canvas
      height={this.props.canvasHeight}
      onMouseMove={this.renderChart}
      onMouseOut={this.renderChart}
      ref={(ref) => this.canvas = ref}
      style={{border: '1px solid #ccc'}}
      width={this.props.canvasWidth}>
    </canvas>);
  }
}


export default LineChart;
