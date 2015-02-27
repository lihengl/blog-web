var React = require("react");

var Cover = require("./cover");

var Application = React.createClass({
    getInitialState: function () {
        "use strict";
        return {content: "Hello, world?"};
    },
    render: function () {
        "use strict";
        return <div className="application">
            <Cover>{this.props.title}</Cover>
            <p>{this.state.content}</p>
        </div>;
    }
});

module.exports = Application;
