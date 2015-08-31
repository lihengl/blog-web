"use strict";
var React = require("react/addons");
var _ = require("lodash");

var Dashboard = require("./Dashboard.jsx");
var Document = require("./Document.jsx");
var Footer = require("./Footer.jsx");
var Header = require("./Header.jsx");


var Application = React.createClass({
    propTypes: {
        blog: React.PropTypes.object.isRequired,
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
        this.intervals.push(setInterval(this.handleInterval, 1000));
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("resize", this.handleResize);
        window.addEventListener("response", this.handleResponse);
        window.addEventListener("loading", this.handleLoading);
        window.addEventListener("focus", this.handleFocus);
        window.addEventListener("edit", this.handleEdit);
    },
    componentWillUnmount: function () {
        window.removeEventListener("edit", this.handleEdit);
        window.removeEventListener("focus", this.handleFocus);
        window.removeEventListener("loading", this.handleLoading);
        window.removeEventListener("response", this.handleResponse);
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("scroll", this.handleScroll);
        this.intervals.map(clearInterval);
    },
    handleLoading: function () {
        this.setState(React.addons.update(this.state, {
            blog: {tagline: {$set: "Loading..."}}
        }));
    },
    handleFocus: function (evt) {
        this.setState(React.addons.update(this.state, {
            focus: {$set: evt.detail}
        }));
    },
    handleResponse: function (evt) {
        this.setState(React.addons.update(this.state, {
            blog: {tagline: {$set: _.pluck(evt.detail, "name").join(", ")}}
        }));
    },
    handleEdit: function (evt) {
        var id = this.state.focus.entry;
        var mutation = (id < 0) ? {title: {$set: evt.detail}} : {
            entries: {[id]: {text: {$set: evt.detail}}}
        };
        this.setState(React.addons.update(this.state, {
            article: mutation,
            focus: {text: {$set: evt.detail}}
        }));
    },
    handleScroll: function () {
        this.setState(React.addons.update(this.state, {
            scroll: {$set: window.scrollY}
        }));
    },
    handleInterval: function () {
        this.setState(React.addons.update(this.state, {
            timestamp: {$set: Date.now()}
        }));
    },
    handleResize: function () {
        this.setState(React.addons.update(this.state, {
            height: {$set: window.innerHeight},
            width: {$set: window.innerWidth}
        }));
    },
    renderBody: function (width) {
        var body = null;

        if (this.state.article) {
            body = (<Document {...this.state.article}
                focus={this.state.focus}
                timestamp={this.state.timestamp}
                width={width}
            />);
        } else if (this.state.user && this.state.blog) {
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
            <Header
                blog={this.state.blog}
                height={this.state.height}
                width={this.state.width}/>
            <div style={{
                padding: "20px 10px 20px 10px",
                margin: "0 auto 0 auto",
                width: width}}>
                {this.renderBody(width)}
            </div>
            <Footer
                author={this.state.user.alias}
                timestamp={this.state.timestamp}/>
        </div>);
    }
});

module.exports = Application;
