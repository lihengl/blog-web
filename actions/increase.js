'use strict';
var Dispatcher = require('../dispatcher');

var Increase = function (amount) {
    var payload = {type: 'INCREMENT'};
    payload.amount = amount;
    Dispatcher.dispatch(payload);
    return;
};

module.exports = Increase;
