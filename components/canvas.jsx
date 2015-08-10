"use strict";
var CountStore = require("../stores/count");

var Paragraph = require("./Paragraph.jsx");
var Subtitle  = require("./Subtitle.jsx");
var Title     = require("./Title.jsx");
var Photo     = require("./Photo.jsx");

var React = require("react/addons");


var SPACING = 56;


var Canvas = React.createClass({
    propTypes: {
        entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        title:   React.PropTypes.string.isRequired,
        width:   React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    getInitialState: function () {
        return {text: CountStore.getTotal()};
    },
    componentDidMount: function () {
        CountStore.addChangeListener(this._handleChange);
        return;
    },
    componentWillUnmount: function () {
        CountStore.removeChangeListener(this._handleChange);
        return;
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
                rendered = (<Paragraph
                    identity={id}
                    key={index}
                    leading={SPACING}>
                    {entry.content}
                </Paragraph>);
                break;
            case "SUBTITLE":
                rendered = (<Subtitle
                    identity={id}
                    key={index}
                    leading={SPACING}>
                    {entry.content}
                </Subtitle>);
                break;
            case "PHOTO":
                rendered = (<Photo
                    description={entry.description}
                    identity={id}
                    key={index}
                    layout={entry.layout}
                    leading={SPACING}
                    source={entry.content}
                    width={this.props.width} />);
                break;
            default:
                rendered = (<div identity={id} key={index} style={{
                    marginBottom: 0,
                    marginTop: 50,
                    color: "#FF0000"}}>
                    {"Invalid Type: " + entry.type}
                </div>);
        }
        return rendered;
    },
    render: function () {
        return (<div>
            <Title identity={0}>{this.props.title}</Title>
            <p>{this.state.text}</p>
            {this.props.entries.map(this._renderEntry)}
        </div>);
    }
});


module.exports = Canvas;
