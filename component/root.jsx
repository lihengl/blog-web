"use strict";
var React = require("react");

var Application = React.createFactory(require("./application"));

var Root = React.createClass({
    render: function ()  {
        var reference = {}, initial = {};

        if (!this.props.local) {
            reference.react = "http://fb.me/react-0.12.2.min.js";
            reference.shim  = "https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.0/es5-shim.min.js";
            reference.sham  = "https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.0/es5-sham.min.js";
            reference.app   = "http://cdn.lihengl.com/blog/";
        } else {
            reference.react = "/bower_components/react/react.js";
            reference.shim  = "/bower_components/es5-shim/es5-shim.min.js";
            reference.sham  = "/bower_components/es5-shim/es5-sham.min.js";
            reference.app   = "/static_assets/blog.";
        }

        initial.html = React.renderToString(Application(this.props.initial));
        initial.json = JSON.stringify(this.props.initial).
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
                <title>{this.props.initial.title}</title>
            </head>
            <body style={{margin: 0, fontFamily: "sans-serif", color: "#333"}}>
                <div id="application" dangerouslySetInnerHTML={{__html: initial.html}}></div>
                <script type="application/json" id="prop" dangerouslySetInnerHTML={{__html: initial.json}}></script>
                <script type="text/javascript" src={reference.shim}></script>
                <script type="text/javascript" src={reference.sham}></script>
                <script type="text/javascript" src={reference.react}></script>
                <script type="text/javascript" src={reference.app + this.props.version + ".min.js"}></script>
            </body>
        </html>;
    }
});

module.exports = Root;
