'use strict';
var Dispatcher = require('../dispatcher');

var Signin = function (email, password) {
    var payload = {type: 'SIGNIN'};
    payload.password = password;
    payload.email = email;
    Dispatcher.dispatch(payload);
    return;
};

module.exports = Signin;
