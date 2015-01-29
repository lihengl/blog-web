var React = require("react");

var Page = React.createClass({
    render: function () {
        "use strict";
        return (
            <html lang="en-US">
                <head>
                    <meta charSet="utf-8"/>
                    <title>Hello</title>
                </head>
                <body>
                    <h1>Hello, {this.props.title}</h1>
                    <script src="http://fb.me/react-0.12.2.min.js"></script>
                </body>
            </html>
        );
    }
});

module.exports = Page;
