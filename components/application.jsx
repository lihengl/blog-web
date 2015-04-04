"use strict";
var Dashboard = require("./dashboard");
var Canvas    = require("./canvas");
var Footer    = require("./footer");
var Cover     = require("./cover");

var React = require("react/addons");

var Application = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        layout: React.PropTypes.string.isRequired,
        title:  React.PropTypes.string.isRequired
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this._adjustSize);
        return;
    },
    componentDidMount: function () {
        window.addEventListener("resize", this._adjustSize);
        return;
    },
    getInitialState: function () {
        return {
            height: 900,
            width: 1440
        };
    },
    _adjustSize: function () {
        var state = this.state;
        state.height = window.innerHeight;
        state.width  = window.innerWidth;
        this.setState(state);
        return;
    },
    render: function () {
        var columnWidth = (Math.min(680, this.state.width) - (10 * 2));
        return <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, 'Segoe UI', sans-serif",
            color: "#333333"}}>
            <Cover height={this.state.height} width={this.state.width}>
                {this.props.title}
            </Cover>
            <div style={{
                padding: "20px 10px 20px 10px",
                margin: "0 auto 0 auto",
                width: columnWidth}}>
                {(this.props.layout === "DASHBOARD") ? <Dashboard>
                </Dashboard> : <Canvas
                    entries={this.props.entries}
                    title={this.props.title}
                    width={columnWidth}>
                </Canvas>}
            </div>
            <Footer />
        </div>;
    }
});

module.exports = Application;
