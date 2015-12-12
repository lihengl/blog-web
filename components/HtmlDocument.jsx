import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';

import ArticlePage from './ArticlePage.jsx';
import ProfilePage from './ProfilePage.jsx';


class HtmlDocument extends Component {
  static propTypes = {
    initialState: PropTypes.object.isRequired,
    og: PropTypes.objectOf(PropTypes.string).isRequired,
    pageName: React.PropTypes.oneOf([
      'ARTICLE',
      'PROFILE'
    ]).isRequired,
    resources: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired
  }
  getPageComponent = () => {
    var pageComponent = null;

    switch (this.props.pageName) {
      case 'ARTICLE':
        pageComponent = ArticlePage;
        break;
      case 'PROFILE':
        pageComponent = ProfilePage;
        break;
      default:
        pageComponent = ProfilePage;
    }

    pageComponent = React.createFactory(pageComponent);
    return pageComponent(this.props.initialState);
  }
  renderHead = () => {
    return (<head>
      <meta charSet="UTF-8"/>
      <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible"/>
      <meta content="telephone=no" name="format-detection"/>
      <meta content={[
        'width=device-width',
        'initial-scale=1.0',
        'minimum-scale=1.0',
        'maximum-scale=1.0',
        'user-scalable=no'].join(',')}
        name="viewport"/>
      {['description', 'image', 'title', 'type', 'url'].map(this.renderOg)}
      <meta name="google" value="notranslate"/>
      <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
      <link href="/favicon.ico" rel="icon" type="image/x-icon"/>
      <title>{this.props.title}</title>
    </head>);
  }
  renderOg = (fieldName) => {
    return ((_.has(this.props.og, fieldName)) ? (<meta
      content={this.props.og[fieldName]}
      key={fieldName}
      name={'og:' + fieldName}
    />) : false);
  }
  renderScript = (sourceUrl, index) => {
    return (<script key={index} src={sourceUrl}></script>);
  }
  render () {
    return (<html lang="en-US">
      {this.renderHead()}
      <body style={{
        fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", sans-serif',
        margin: 0}}>
        <div className={this.props.pageName.toLowerCase()}
          dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToString(this.getPageComponent())
          }} id="application"></div>
        <script dangerouslySetInnerHTML={{
          __html: JSON.stringify(this.props.initialState)
          .replace(/<\/script/g, '<\\/script')
          .replace(/<!--/g, '<\\!--')
        }} id="initial-state" type="application/json"></script>
        {this.props.resources.map(this.renderScript)}
      </body>
    </html>);
  }
}


export default HtmlDocument;
