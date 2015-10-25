/* eslint-env browser */
import React, { Component, PropTypes } from 'react';


class Navbar extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  updatePassword = (evt) => {
    var password = evt.target.value;
    window.dispatchEvent(new CustomEvent('password', {detail: password}));
  }
  updateEmail = (evt) => {
    var email = evt.target.value;
    window.dispatchEvent(new CustomEvent('email', {detail: email}));
  }
  validatePassword = () => {
    if (/^[a-zA-Z0-9]{6,20}$/.test(this.props.password)) { return; }
    window.dispatchEvent(new CustomEvent('invalid', {detail: 'email'}));
  }
  validateEmail = () => {
    if (/(@{1})(?=\w)/.test(this.props.email)) { return; }
    window.dispatchEvent(new CustomEvent('invalid', {detail: 'password'}));
  }
  submitCredential = () => {
    window.dispatchEvent(new CustomEvent('submit'));
  }
  render () {
    return (<div style={{
      paddingTop: 6,
      position: 'fixed',
      textAlign: 'right',
      top: 0,
      width: '100%'}}>
      <input onChange={this.updateEmail} style={{
        borderColor: this.validateEmail() ? '#000000' : '#FF0000',
        fontSize: 14}} type="text" value={this.props.email} />
      <input onChange={this.updatePassword} style={{
        borderColor: this.validatePassword() ? '#000000' : '#FF0000',
        marginLeft: 10,
        fontSize: 14}} type="password" value={this.props.password} />
      <button onClick={this.submitCredential} style={{
        marginRight: 10,
        marginLeft: 10,
        fontSize: 14}}>
        {"Signin"}
      </button>
    </div>);
  }
}

export default Navbar;
