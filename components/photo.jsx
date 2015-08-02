"use strict";
var FocusAction = require("../actions/focus");

var React = require("react/addons");

var Photo = React.createClass({
    propTypes: {
        description: React.PropTypes.string,
        identity:    React.PropTypes.number.isRequired,
        layout:      React.PropTypes.string.isRequired,
        leading:     React.PropTypes.number.isRequired,
        source:      React.PropTypes.string.isRequired,
        width:       React.PropTypes.number.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    _clickText: function (characterIndex) {
        FocusAction(characterIndex, this.props.description);
        return;
    },
    render: function () {
        var imageStyle = {cursor: "pointer"};
        var hasText = (
            this.props.description &&
            this.props.description.length > 0
        );
        var self = this;

        if (this.props.layout === "portrait") {
            imageStyle.height = this.props.width;
            imageStyle.width = "auto";
        } else {
            imageStyle.height = "auto";
            imageStyle.width = "100%";
        }

        return (<div style={{
            marginBottom: 0,
            marginTop: this.props.leading,
            textAlign: "center"}}>
            <div style={{
                backgroundColor: "#EFEFEF",
                fontSize: 0}}>
                <img src={this.props.source} style={imageStyle}/>
            </div>
            {(!hasText) ? false : <div style={{
                marginBottom: 0,
                lineHeight: "20px",
                marginTop: 12,
                textAlign: "right",
                fontSize: 14}}>
                {this.props.description
                    .split("")
                    .map(function (character, index) {
                    return (<span
                        key={index}
                        onClick={self._clickText.bind(self, index)}>
                        {character}
                    </span>);
                })}
            </div>}
        </div>);
    }
});

module.exports = Photo;
