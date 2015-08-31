"use strict";
var React = require("react/addons");


var Navbar = React.createClass({
    propTypes: {
        email: React.PropTypes.string.isRequired,
        password: React.PropTypes.string.isRequired
    },
    mixins: [React.addons.PureRenderMixin],
    updatePassword: function (evt) {
        var password = evt.target.value;
        window.dispatchEvent(new CustomEvent("password", {detail: password}));
    },
    updateEmail: function (evt) {
        var email = evt.target.value;
        window.dispatchEvent(new CustomEvent("email", {detail: email}));
    },
    validatePassword: function () {
        if (/^[a-zA-Z0-9]{6,20}$/.test(this.props.password)) { return; }
        window.dispatchEvent(new CustomEvent("invalid", {detail: "email"}));
    },
    validateEmail: function (evt) {
        if (/(@{1})(?=\w)/.test(this.props.email)) { return; }
        window.dispatchEvent(new CustomEvent("invalid", {detail: "password"}));
    },
    submitCredential: function () {
        window.dispatchEvent(new CustomEvent("submit"));
    },
    render: function () {
        return (<div style={{
            paddingTop: 6,
            position: "fixed",
            textAlign: "right",
            top: 0,
            width: "100%"}}>
            <input onChange={this.updateEmail} style={{
                borderColor: this.validateEmail() ? "#000000" : "#FF0000",
                fontSize: 14}}
                type="text"
                value={this.props.email} />
            <input onChange={this.updatePassword} style={{
                borderColor: this.validatePassword() ? "#000000" : "#FF0000",
                marginLeft: 10,
                fontSize: 14}}
                type="password"
                value={this.props.password} />
            <button onClick={this.submitCredential} style={{
                marginRight: 10,
                marginLeft: 10,
                fontSize: 14}}>
                {"Signin"}
            </button>
        </div>);
    }
});

module.exports = Navbar;
