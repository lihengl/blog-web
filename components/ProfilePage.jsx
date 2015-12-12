import React, { Component, PropTypes } from 'react';
import ReactUpdate from 'react-addons-update';

import PageFooter from './PageFooter.jsx';
import PageHeader from './PageHeader.jsx';

import LineGraph from './LineGraph.jsx';


class ProfilePage extends Component {
  static propTypes = {
    scroll: PropTypes.number.isRequired,
    timestamp: PropTypes.number,
    user: PropTypes.shape({
      alias: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    }).isRequired,
    width: PropTypes.number.isRequired
  }
  static defaultProps = {
    timestamp: 0
  }
  constructor (props) {
    super(props);
    this.state = this.props;
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    var stateDiff = {width: {$set: window.innerWidth}};
    this.setState(ReactUpdate(this.state, stateDiff));
  }
  render () {
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
        <LineGraph/>
      </div>
      <PageFooter
        userName={this.state.user.alias}
        yearNumber={2015}/>
    </div>);
  }
}


export default ProfilePage;
