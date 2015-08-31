"use strict";
var React = require("react/addons");

var Application = React.createFactory(require("./Application"));

var Page = React.createClass({
    propTypes: {
        client: React.PropTypes.object.isRequired,
        og: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
        resources: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        title: React.PropTypes.string.isRequired
    },
    renderOg: function (name) {
        var content = this.props.og[name];
        if (!content) { return false; }
        return (<meta content={content} key={name} name={"og:" + name}/>);
    },
    render: function () {
        return (<html lang="en-US">
            <head>
                <meta charSet="UTF-8"/>
                <meta content="IE=edge" httpEquiv="X-UA-Compatible"/>
                <meta content="telephone=no" name="format-detection"/>
                <meta content={[
                    "width=device-width",
                    "initial-scale=1.0",
                    "minimum-scale=1.0",
                    "maximum-scale=1.0",
                    "user-scalable=no"].join(",")}
                    name="viewport"/>
                {["description", "image", "title", "type", "url"].map(this.renderOg)}
                <meta name="google" value="notranslate"/>
                <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
                <link href="/favicon.ico" rel="icon" type="image/x-icon"/>
                <title>{this.props.title}</title>
            </head>
            <body style={{margin: 0}}>
                <div dangerouslySetInnerHTML={{
                    __html: React.renderToString(Application(this.props.client))
                }} id="application"></div>
                <script dangerouslySetInnerHTML={{
                    __html: JSON.stringify(this.props.client)
                    .replace(/<\/script/g, "<\\/script")
                    .replace(/<!--/g, "<\\!--")
                }} id="state" type="application/json"></script>
                {this.props.resources.map(function (resource, index) {
                    return <script key={index} src={resource}></script>;
                })}
            </body>
        </html>);
    }
});

module.exports = Page;
