var React = require("react");

var Page = React.createClass({
    getInitialState: function () {
        "use strict";
        return {content: "Hi, there?"};
    },
    handleChange: function () {
        "use strict";
        return;
    },
    render: function () {
        "use strict";
        var ref = {
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
                <link href={ref.src + this.props.version + ".min.css"} type="text/css" rel="stylesheet"/>
                <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
                <link href="/favicon.ico" type="image/x-icon" rel="icon"/>
                <title>{this.props.title}</title>
            </head>
            <body>
                <h1>{this.props.title}</h1>
                <input type="text" value={this.state.content}/>
                <div id="bd"></div>
                <script src={ref.lib}></script>
                <script src={ref.src + this.props.version + ".min.js"}></script>
            </body>
        </html>;
    }
});

module.exports = Page;
