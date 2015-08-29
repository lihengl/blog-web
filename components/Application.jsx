"use strict";
var React = require("react/addons");
var _ = require("lodash");

var Dashboard = require("./Dashboard.jsx");
var Document = require("./Document.jsx");
var Footer = require("./Footer.jsx");
var Header = require("./Header.jsx");


var Application = React.createClass({
    propTypes: {
        blog: React.PropTypes.shape({
            name: React.PropTypes.string,
            tagline: React.PropTypes.string
        }).isRequired,
        focus: React.PropTypes.object,
        height: React.PropTypes.number.isRequired,
        scroll: React.PropTypes.number.isRequired,
        timestamp: React.PropTypes.number.isRequired,
        user: React.PropTypes.shape({
            alias: React.PropTypes.string.isRequired,
            id: React.PropTypes.number
        }).isRequired,
        width: React.PropTypes.number.isRequired,
    },
    mixins: [React.addons.PureRenderMixin],
    getDefaultProps: function () {
        return {focus: null, timestamp: 0};
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
        window.addEventListener("edit", this.handleEditEvent);
    },
    componentWillUnmount: function () {
        window.removeEventListener("edit", this.handleEditEvent);
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
        this.setState(React.addons.update(this.state, {
            focus: {$set: evt.detail}
        }));
    },
    handleResponseEvent: function (evt) {
        this.setState(React.addons.update(this.state, {
            tagline: {$set: _.pluck(evt.detail, "name").join(", ")}
        }));
    },
    handleEditEvent: function (evt) {
        var id = this.state.focus.entry;
        var mutation = (id < 0) ? {title: {$set: evt.detail}} : {
            entries: {[id]: {text: {$set: evt.detail}}}
        };
        this.setState(React.addons.update(this.state, {
            article: mutation,
            focus: {text: {$set: evt.detail}}
        }));
    },
    updateScrollPosition: function () {
        this.setState(React.addons.update(this.state, {
            scroll: {$set: window.scrollY}
        }));
    },
    updateTimestamp: function () {
        return;
        this.setState(React.addons.update(this.state, {
            timestamp: {$set: Date.now()}
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
            body = (<Document {...this.state.article} focus={this.state.focus} width={width}/>);
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
            <Header height={this.state.height} width={this.state.width}>
                {this.state.blog}
            </Header>
            <div style={{
                padding: "20px 10px 20px 10px",
                margin: "0 auto 0 auto",
                width: width}}>
                {this.renderBody(width)}
            </div>
            <Footer author={this.state.user.alias} timestamp={this.state.timestamp} />
        </div>);
    }
});

module.exports = Application;
