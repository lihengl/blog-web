var React = require("react");
var Cover = require("./cover");

var Blog = React.createClass({
    getInitialState: function () {
        "use strict";
        return {content: "Hello, world!"};
    },
    render: function () {
        "use strict";
        return <div className="blog">
            <Cover>{this.props.title}</Cover>
            <p>{this.state.content}</p>
        </div>;
    }
});

module.exports = Blog;
