var React = require("react");

var Page = React.createClass({
    render: function () {
        "use strict";
        var reference = {
            react: this.props.local ? "/bower_components/react/react.min.js" : "http://fb.me/react-0.12.2.min.js",
            style: this.props.local ? "/static/blog." : "http://cdn.lihengl.com/blog/"
        };
        return <html lang="en-US">
            <head>
                <meta charSet="utf-8"/>
                <title>Hello | Li-Heng Liang</title>
                <link rel="stylesheet" href={reference.style + this.props.version + ".min.css"}/>
            </head>
            <body>
                <h1>Blog Web Application</h1>
                <input type="text" value="Hello, world!"/>
                <script src={reference.react}></script>
            </body>
        </html>;
    }
});

module.exports = Page;
