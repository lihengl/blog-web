"use strict";
var Dashboard = require("./Dashboard.jsx");
var Document = require("./Document.jsx");
var Footer = require("./Footer.jsx");
var Header = require("./Header.jsx");

var React = require("react/addons");
var _ = require("lodash");


var Application = React.createClass({
    propTypes: {
        height: React.PropTypes.number.isRequired,
        scroll: React.PropTypes.number.isRequired,
        tagline: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired,
    },
    mixins: [React.addons.PureRenderMixin],
    getDefaultProps: function () {
        return {timestamp: 0};
    },
    getInitialState: function () {
        return this.props;
    },
    componentWillMount: function() {
        this.intervals = [];
    },
    componentDidMount: function () {
        this.intervals.push(setInterval(this.updateTimestamp, 1000));
        window.addEventListener("scroll", this.updateScrollPosition);
        window.addEventListener("resize", this.updateWindowSize);
        window.addEventListener("response", this.handleResponseEvent);
        window.addEventListener("loading", this.handleLoadingEvent);
        window.addEventListener("focus", this.handleFocusEvent);
        window.addEventListener("text", this.handleTextEvent);
    },
    componentWillUnmount: function () {
        window.removeEventListener("text", this.handleTextEvent);
        window.removeEventListener("focus", this.handleFocusEvent);
        window.removeEventListener("loading", this.handleLoadingEvent);
        window.removeEventListener("response", this.handleResponseEvent);
        window.removeEventListener("resize", this.updateWindowSize);
        window.removeEventListener("scroll", this.updateScrollPosition);
        this.intervals.map(clearInterval);
    },
    handleLoadingEvent: function () {
        this.setState(React.addons.update(this.state, {
            tagline: {$set: "Loading..."}
        }));
    },
    handleFocusEvent: function (evt) {
        console.info(evt.detail);
    },
    handleResponseEvent: function (evt) {
        this.setState(React.addons.update(this.state, {
            tagline: {$set: _.pluck(evt.detail, "name").join(", ")}
        }));
    },
    handleTextEvent: function (evt) {
        var mutation = {content: {$set: evt.detail.text}};
        this.setState(React.addons.update(this.state, {
            article: {entries: {[evt.detail.entryId]: mutation}}
        }));
    },
    updateScrollPosition: function () {
        this.setState(React.addons.update(this.state, {
            scroll: {$set: window.scrollY}
        }));
    },
    updateTimestamp: function () {
        this.setState(React.addons.update(this.state, {
            timestamp: {$set: Math.floor(Date.now() / 1000.0)}
        }));
    },
    updateWindowSize: function () {
        this.setState(React.addons.update(this.state, {
            height: {$set: window.innerHeight},
            width: {$set: window.innerWidth}
        }));
    },
    renderBody: function (width) {
        var body = null;

        if (this.state.article) {
            body = (<Document {...this.state.article} width={width} />);
        } else if (this.state.setting) {
            body = <Dashboard />;
        } else {
            body = (<div style={{color: "#FF0000"}}>
                {"Unexpected Application state: " + this.state}
            </div>);
        }

        return body;
    },
    render: function () {
        var width = Math.min(680, this.state.width) - (10 * 2);
        return (<div style={{
            fontFamily: "'Helvetica Neue', Helvetica, 'Segoe UI', sans-serif",
            color: "#333333"}}>
            <Header height={this.state.height} tagline={this.state.tagline} width={this.state.width}>
                {this.state.title}
            </Header>
            <div style={{
                padding: "20px 10px 20px 10px",
                margin: "0 auto 0 auto",
                width: width}}>
                {this.renderBody(width)}
            </div>
            <Footer author={"liheng"} />
        </div>);
    }
});

module.exports = Application;
