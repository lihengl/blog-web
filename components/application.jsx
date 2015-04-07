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
        window.removeEventListener("resize", this._handleResize);
        return;
    },
    componentDidMount: function () {
        window.addEventListener("resize", this._handleResize);
        return;
    },
    getInitialState: function () {
        return {
            height: 900,
            width: 1440
        };
    },
    _handleResize: function () {
        this.setState({
            height: window.innerHeight,
            width:  window.innerWidth
        });
        return;
    },
    _renderBody: function (width) {
        var rendered = null;
        switch (this.props.layout.toUpperCase()) {
            case "DASHBOARD":
                rendered = <Dashboard />;
                break;
            case "CANVAS":
                rendered = <Canvas
                    entries={this.props.entries}
                    title={this.props.title}
                    width={width}>
                </Canvas>;
                break;
            default:
                rendered = <div style={{
                    marginBottom: 0,
                    marginTop: 50,
                    color: "#FF0000"}}>
                    {"Invalid Layout: " + this.props.layout}
                </div>;
        }
        return rendered;
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
                {this._renderBody(columnWidth)}
            </div>
            <Footer author={"liheng"} />
        </div>;
    }
});

module.exports = Application;
