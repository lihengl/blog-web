"use strict";
var React = require("react/addons");

var Application = React.createFactory(require("./application"));

var Root = React.createClass({
    propTypes: {
        libraries: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        bundle:    React.PropTypes.string.isRequired,
        data:      React.PropTypes.object.isRequired
    },
    render: function () {
        return <html lang="en-US">
            <head>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="viewport" content={[
                    "width=device-width",
                    "initial-scale=1.0",
                    "minimum-scale=1.0",
                    "maximum-scale=1.0",
                    "user-scalable=no"].join(",")}/>
                <meta name="google" value="notranslate"/>
                <link href="/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
                <link href="/favicon.ico" type="image/x-icon" rel="icon"/>
                <title>{this.props.data.title}</title>
            </head>
            <body style={{margin: 0}}>
                <div id="application" dangerouslySetInnerHTML={{
                    __html: React.renderToString(Application(this.props.data))
                }}></div>
                <script type="application/json" id="state" dangerouslySetInnerHTML={{
                    __html: JSON.stringify(this.props.data)
                    .replace(/<\/script/g, "<\\/script")
                    .replace(/<!--/g, "<\\!--")
                }}></script>
                {this.props.libraries.map(function (library, index) {
                    return <script type="text/javascript" key={index} src={library}></script>;
                })}
                <script type="text/javascript" src={this.props.bundle}></script>
            </body>
        </html>;
    }
});

module.exports = Root;
