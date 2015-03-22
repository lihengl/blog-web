"use strict";
var React = require("react");

var Application = React.createFactory(require("./application"));

var Root = React.createClass({
    render: function ()  {
        var libraries = [], initial = {}, self = this;

        libraries = (this.props.statichost.lib === "/node_modules") ? [
            "/bluebird/js/browser/bluebird.js",
            "/es5-shim/es5-shim.js",
            "/es5-shim/es5-sham.js",
            "/react/dist/react.js"
        ] : [
            "/bluebird/2.9.14/bluebird.min.js",
            "/es5-shim/4.1.0/es5-shim.min.js",
            "/es5-shim/4.1.0/es5-sham.min.js",
            "/react/0.13.1/react.min.js"
        ];

        initial.html = React.renderToString(Application(this.props.state));
        initial.json = JSON.stringify(this.props.state).
            replace(/<\/script/g, "<\\/script").
            replace(/<!--/g, "<\\!--");

        return <html lang="en-US">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="google" value="notranslate"/>
                <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
                <link href="/favicon.ico" type="image/x-icon" rel="icon"/>
                <title>{this.props.state.title}</title>
            </head>
            <body style={{
                fontFamily: "'Helvetica Neue', Helvetica, 'Segoe UI', Arial, freesans, sans-serif",
                margin: 0,
                color: "#333333"}}>
                <div id="application" dangerouslySetInnerHTML={{__html: initial.html}}></div>
                <script type="application/json" id="state" dangerouslySetInnerHTML={{__html: initial.json}}></script>
                {libraries.map(function (library, index) {
                    return <script type="text/javascript" key={index} src={self.props.statichost.lib + library}></script>;
                })}
                <script type="text/javascript" src={this.props.statichost.app + this.props.bundle}></script>
            </body>
        </html>;
    }
});

module.exports = Root;
