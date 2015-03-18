"use strict";
var React = require("react");

var Application = React.createFactory(require("./application"));

var Root = React.createClass({
    render: function ()  {
        var reference = {}, initial = {};

        if (this.props.cdnized) {
            reference.application = "https://cdn.lihengl.com/blog/";
            reference.bluebird    = "https://cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.14/bluebird.min.js";
            reference.es5shim     = "https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.0/es5-shim.min.js";
            reference.es5sham     = "https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.0/es5-sham.min.js";
            reference.react       = "https://cdnjs.cloudflare.com/ajax/libs/react/0.13.1/react.min.js";
        } else {
            reference.application = "/static_assets/";
            reference.bluebird    = "/node_modules/bluebird/js/browser/bluebird.js";
            reference.es5shim     = "/node_modules/es5-shim/es5-shim.js";
            reference.es5sham     = "/node_modules/es5-shim/es5-sham.js";
            reference.react       = "/node_modules/react/dist/react.js";
        }

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
                <script type="text/javascript" src={reference.bluebird}></script>
                <script type="text/javascript" src={reference.es5shim}></script>
                <script type="text/javascript" src={reference.es5sham}></script>
                <script type="text/javascript" src={reference.react}></script>
                <script type="text/javascript" src={reference.application + this.props.application}></script>
            </body>
        </html>;
    }
});

module.exports = Root;
