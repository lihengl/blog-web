var React = require("react");

var Cover = React.createClass({
    render: function () {
        "use strict";
        return <div className="cover">
            <h1>{this.props.children}</h1>
        </div>;
    }
});

module.exports = Cover;
