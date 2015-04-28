"use strict";
var Signin = require("../actions/signin");

var React = require("react/addons");

var Navbar = React.createClass({
    mixins: [React.addons.PureRenderMixin],
    propTypes: {
    },
    getInitialState: function () {
        return {
            password: {
                value: "1qaz",
                valid: true
            },
            email: {
                value: "abra@ka.dabra",
                valid: true
            }
        };
    },
    _validatePassword: function (event) {
        var state = this.state, value = event.target.value;
        state.password.valid = /^[a-zA-Z0-9]{6,20}$/.test(value);
        state.password.value = value;
        this.setState(state);
        return;
    },
    _validateEmail: function (event) {
        var state = this.state, value = event.target.value;
        state.email.valid = /(@{1})(?=\w)/.test(value);
        state.email.value = value;
        this.setState(state);
        return;
    },
    _submitIdentity: function () {
        Signin("admin@lihengl.com", "1qaz");
        return;
    },
    render: function () {
        return <div style={{
            paddingTop: 6,
            textAlign: "right",
            position: "fixed",
            width: "100%",
            top: 0}}>
            <input type="text" value={this.state.email.value} style={{
                borderColor: (this.state.email.valid) ? "#000000" : "#FF0000",
                fontSize: 14
            }} onChange={this._validateEmail} />
            <input type="password" value={this.state.password.value} style={{
                borderColor: (this.state.password.valid) ? "#000000" : "#FF0000",
                marginLeft: 10,
                fontSize: 14
            }} onChange={this._validatePassword} />
            <button style={{
                marginRight: 10,
                marginLeft: 10,
                fontSize: 14
            }} onClick={this._submitIdentity}>
                {"Signin"}
            </button>
        </div>;
    }
});

module.exports = Navbar;
