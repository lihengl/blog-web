"use strict";
var Dashboard = require("./Dashboard.jsx");
var Document = require("./Document.jsx");
var Footer = require("./Footer.jsx");
var Header = require("./Header.jsx");

var React = require("react/addons");

var Application = React.createClass({
    propTypes: {
        entries: React.PropTypes.array,
        layout: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    getInitialState: function () {
        return {height: 900, width: 1440};
    },
    componentDidMount: function () {
        window.addEventListener("resize", this.resize);
    },
    componentWillUnmount: function () {
        window.removeEventListener("resize", this.resize);
    },
    resize: function () {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    },
    renderBody: function (width) {
        var rendered = null;
        if (this.props.layout.toUpperCase() === "DASHBOARD") {
            rendered = <Dashboard />;
        } else if (this.props.layout.toUpperCase() === "DOCUMENT") {
            rendered = (<Document
                entries={this.props.entries}
                title={this.props.title}
                width={width} />);
        } else {
            rendered = (<div style={{
                marginBottom: 0,
                marginTop: 50,
                color: "#FF0000"}}>
                {"Invalid Layout: " + this.props.layout}
            </div>);
        }
        return rendered;
    },
    render: function () {
        var columnWidth = (Math.min(680, this.state.width) - (10 * 2));
        return (<div style={{
            fontFamily: "'Helvetica Neue', Helvetica, 'Segoe UI', sans-serif",
            color: "#333333"}}>
            <Header height={this.state.height} width={this.state.width}>
                {this.props.title}
            </Header>
            <div style={{
                padding: "20px 10px 20px 10px",
                margin: "0 auto 0 auto",
                width: columnWidth}}>
                {this.renderBody(columnWidth)}
            </div>
            <Footer author={"liheng"} />
        </div>);
    }
});

module.exports = Application;
