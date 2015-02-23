var React = require("react");
var Cover = require("./cover");

var Blog = React.createClass({
    getInitialState: function () {
        "use strict";
        return {content: "Hello, world!"};
    },
    render: function () {
        "use strict";
        return <div>
            <h1>{this.props.title}</h1>
            <p>{this.state.content}</p>
            <Cover></Cover>
        </div>;
    }
});

module.exports = Blog;
