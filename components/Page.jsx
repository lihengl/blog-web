import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import Application from './Application';

class Page extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    og: PropTypes.objectOf(PropTypes.string).isRequired,
    resources: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired
  }
  renderOG = (name) => {
    var content = this.props.og[name];
    if (!content) { return false; }
    return (<meta content={content} key={name} name={'og:' + name}/>);
  }
  renderScript = (resource, index) => {
    return (<script key={index} src={resource}></script>);
  }
  render () {
    var Main = React.createFactory(Application);
    return (<html lang="en-US">
      <head>
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
        {['description', 'image', 'title', 'type', 'url'].map(this.renderOG)}
        <meta name="google" value="notranslate"/>
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
        <link href="/favicon.ico" rel="icon" type="image/x-icon"/>
        <title>{this.props.title}</title>
      </head>
      <body style={{margin: 0}}>
        <div dangerouslySetInnerHTML={{
          __html: ReactDOMServer.renderToString(Main(this.props.client))
        }} id="application"></div>
        <script dangerouslySetInnerHTML={{
          __html: JSON.stringify(this.props.client)
          .replace(/<\/script/g, '<\\/script')
          .replace(/<!--/g, '<\\!--')
        }} id="state" type="application/json"></script>
        {this.props.resources.map(this.renderScript)}
      </body>
    </html>);
  }
}

export default Page;
