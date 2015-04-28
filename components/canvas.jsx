"use strict";
var CountStore = require("../stores/count");

var Paragraph = require("./paragraph");
var Subtitle  = require("./subtitle");
var Title     = require("./title");
var Photo     = require("./photo");

var React = require("react/addons");


var SPACING = 56;


var Canvas = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
        entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        width:   React.PropTypes.number.isRequired,
        title:   React.PropTypes.string.isRequired
    },
    componentWillUnmount: function () {
        CountStore.removeChangeListener(this._handleChange);
        return;
    },
    componentDidMount: function () {
        CountStore.addChangeListener(this._handleChange);
        return;
    },
    getInitialState: function () {
        return {text: CountStore.getTotal()};
    },
    _handleChange: function () {
        var state = this.state;
        state.text = CountStore.getTotal();
        this.setState(state);
        return;
    },
    _renderEntry: function (entry, index) {
        var rendered = null, id = index + 1;
        switch (entry.type.toUpperCase()) {
            case "PARAGRAPH":
                rendered = <Paragraph
                    identity={id}
                    leading={SPACING}
                    key={index}>
                    {entry.content}
                </Paragraph>;
                break;
            case "SUBTITLE":
                rendered = <Subtitle
                    identity={id}
                    leading={SPACING}
                    key={index}>
                    {entry.content}
                </Subtitle>;
                break;
            case "PHOTO":
                rendered = <Photo
                    description={entry.description}
                    identity={id}
                    leading={SPACING}
                    source={entry.content}
                    layout={entry.layout}
                    width={this.props.width}
                    key={index} />;
                break;
            default:
                rendered = <div identity={id} key={index} style={{
                    marginBottom: 0,
                    marginTop: 50,
                    color: "#FF0000"}}>
                    {"Invalid Type: " + entry.type}
                </div>;
        }
        return rendered;
    },
    render: function () {
        return <div>
            <Title identity={0}>{this.props.title}</Title>
            <p>{this.state.text}</p>
            {this.props.entries.map(this._renderEntry)}
        </div>;
    }
});


module.exports = Canvas;
