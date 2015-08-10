"use strict";
var React = require("react/addons");

var Application = React.createFactory(require("./Application"));

var Root = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        metadata: React.PropTypes.object.isRequired,
        sources: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    },
    render: function () {
        return (<html lang="en-US">
            <head>
                <meta charSet="UTF-8"/>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible"/>
                <meta content="telephone=no" name="format-detection"/>
                <meta content={[
                    "width=device-width",
                    "initial-scale=1.0",
                    "minimum-scale=1.0",
                    "maximum-scale=1.0",
                    "user-scalable=no"].join(",")}
                    name="viewport"/>
                <meta name="google" value="notranslate"/>
                <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
                <link href="/favicon.ico" rel="icon" type="image/x-icon"/>
                <title>{this.props.metadata.title}</title>
            </head>
            <body style={{margin: 0}}>
                <div dangerouslySetInnerHTML={{
                    __html: React.renderToString(Application(this.props.data))
                }} id="application"></div>
                <script dangerouslySetInnerHTML={{
                    __html: JSON.stringify(this.props.data)
                    .replace(/<\/script/g, "<\\/script")
                    .replace(/<!--/g, "<\\!--")
                }} id="state" type="application/json"></script>
                {this.props.sources.map(function (source, index) {
                    return <script key={index} src={source}></script>;
                })}
            </body>
        </html>);
    }
});

module.exports = Root;
