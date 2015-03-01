"use strict";
var React = require("react");

var Cover = React.createClass({
    render: function () {
        return <div style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/static_assets/cover.jpg)",
            backgroundSize: "cover",
            paddingTop: "180px",
            textShadow: "0 1px 2px rgba(0,0,0,.5)",
            textAlign: "center",
            height: "420px",
            color: "#FFF"}}>
            <h1 style={{fontWeight: "bold", fontSize: "60px"}}>
                {this.props.children}
            </h1>
        </div>;
    }
});

module.exports = Cover;
