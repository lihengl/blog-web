var React = require("react");

var Cover = require("./cover");

var Application = React.createClass({
    updateScreenWidth: function () {
        "use strict";
        this.setState({content: window.innerWidth});
        return;
    },
    componentWillUnmount: function() {
        "use strict";
        window.removeEventListener("resize", this.updateScreenWidth);
    },
    componentDidMount: function() {
        "use strict";
        window.addEventListener("resize", this.updateScreenWidth);
    },
    getInitialState: function () {
        "use strict";
        return {content: "Hello, world?"};
    },
    render: function () {
        "use strict";
        return <div>
            <Cover>{this.props.title}</Cover>
            <p>{this.state.content}</p>
        </div>;
    }
});

module.exports = Application;
