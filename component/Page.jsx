var React = require("react");

var Page = React.createClass({
    render: function () {
        "use strict";
        var content = JSON.stringify(this.props.content), url = {
            lib: this.props.local ? "/bower_components/react/react.js" : "http://fb.me/react-0.12.2.min.js",
            app: this.props.local ? "/static_assets/blog." : "cdn.lihengl.com/blog/"
        };
        url.app += this.props.version + ".min.";
        content = content.replace(/<\/script/g, "<\\/script").replace(/<!--/g, "<\\!--");
        return <html lang="en-US">
            <head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="google" value="notranslate"/>
                <link href={url.app + "css"} type="text/css" rel="stylesheet"/>
                <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
                <link href="/favicon.ico" type="image/x-icon" rel="icon"/>
                <title>{this.props.content.title}</title>
            </head>
            <body>
                <div id="blog" dangerouslySetInnerHTML={{__html: this.props.blog}}></div>
                <script type="application/json" id="content" dangerouslySetInnerHTML={{__html: content}}></script>
                <script type="text/javascript" src={url.lib}></script>
                <script type="text/javascript" src={url.app + "js"}></script>
            </body>
        </html>;
    }
});

module.exports = Page;
