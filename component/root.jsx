var React = require("react");

var Application = React.createFactory(require("./application"));

var Page = React.createClass({
    render: function () {
        "use strict";
        var reference = {}, initial = {};

        reference.lib = this.props.local ? "/bower_components/react/react.js" : "http://fb.me/react-0.12.2.min.js";
        reference.app = this.props.local ? "/static_assets/blog." : "http://cdn.lihengl.com/blog/";

        initial.html = React.renderToString(Application(this.props.data));
        initial.data = JSON.stringify(this.props.data).
            replace(/<\/script/g, "<\\/script").
            replace(/<!--/g, "<\\!--");

        return <html lang="en-US">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="google" value="notranslate"/>
                <link href={reference.app + this.props.version + ".min.css"} type="text/css" rel="stylesheet"/>
                <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
                <link href="/favicon.ico" type="image/x-icon" rel="icon"/>
                <title>{this.props.data.title}</title>
            </head>
            <body>
                <div id="application" dangerouslySetInnerHTML={{__html: initial.html}}></div>
                <script type="application/json" id="prop" dangerouslySetInnerHTML={{__html: initial.data}}></script>
                <script type="text/javascript" src={reference.lib}></script>
                <script type="text/javascript" src={reference.app + this.props.version + ".min.js"}></script>
            </body>
        </html>;
    }
});

module.exports = Page;
