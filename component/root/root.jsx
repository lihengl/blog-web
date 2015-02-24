var React = require("react");
var Cover = require("./cover");

var Root = React.createClass({
    getInitialState: function () {
        "use strict";
        return {content: "Hello, world?"};
    },
    render: function () {
        "use strict";
        return <div className="root">
            <Cover>{this.props.title}</Cover>
            <p>{this.state.content}</p>
        </div>;
    }
});

module.exports = Root;
