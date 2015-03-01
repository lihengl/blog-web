var React = require("react");

var Cover = React.createClass({
    render: function () {
        "use strict";
        return <div style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/static_assets/cover.jpg)",
            backgroundSize: "cover",
            textShadow: "0 1px 2px rgba(0,0,0,.5)",
            paddingTop: "150px",
            textAlign: "right",
            height: "400px",
            color: "#FFF"}}>
            <h1 style={{fontWeight: "bold", fontSize: "50px"}}>{this.props.children}</h1>
        </div>;
    }
});

module.exports = Cover;
