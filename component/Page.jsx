var React = require("react");

var Page = React.createClass({
    render: function () {
        "use strict";
        var external = {
            lib: this.props.local ? "/bower_components/react/react.min.js" : "http://fb.me/react-0.12.2.min.js",
            src: this.props.local ? "/static/blog." : "http://cdn.lihengl.com/blog/"
        };
        return <html lang="en-US">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="google" value="notranslate"/>
                <link href={external.src + this.props.version + ".min.css"} type="text/css" rel="stylesheet"/>
                <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
                <link href="/favicon.ico" type="image/x-icon" rel="icon"/>
                <title>{this.props.title}</title>
            </head>
            <body>
                <h1>{this.props.title}</h1>
                <input type="text" value="Hello, world!"/>
                <div id="bd"></div>
                <script src={external.lib}></script>
                <script src={external.src + this.props.version + ".min.js"}></script>
            </body>
        </html>;
    }
});

module.exports = Page;
