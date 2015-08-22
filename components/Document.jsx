"use strict";
var CountStore = require("../stores/count");

var Paragraph = require("./Paragraph.jsx");
var Subtitle = require("./Subtitle.jsx");
var Title = require("./Title.jsx");
var Photo = require("./Photo.jsx");

var React = require("react/addons");


var Document = React.createClass({
    propTypes: {
        entries: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        title: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    getInitialState: function () {
        return {text: CountStore.getTotal()};
    },
    componentDidMount: function () {
        CountStore.addChangeListener(this.update);
    },
    componentWillUnmount: function () {
        CountStore.removeChangeListener(this.update);
    },
    update: function () {
        var state = this.state;
        state.text = CountStore.getTotal();
        this.setState(state);
    },
    renderEntry: function (entry, index) {
        var rendered = null, id = index + 1;
        if (entry.type.toUpperCase() === "PARAGRAPH") {
            rendered = (<Paragraph
                identity={id}
                key={index}
                leading={56}>
                {entry.content}
            </Paragraph>);
        } else if (entry.type.toUpperCase() === "SUBTITLE") {
            rendered = (<Subtitle
                identity={id}
                key={index}
                leading={56}>
                {entry.content}
            </Subtitle>);
        } else if (entry.type.toUpperCase() === "PHOTO") {
            rendered = (<Photo
                description={entry.description}
                identity={id}
                key={index}
                layout={entry.layout}
                leading={56}
                source={entry.content}
                width={this.props.width} />);
        } else {
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
            {this.props.entries.map(this.renderEntry)}
        </div>);
    }
});


module.exports = Document;
