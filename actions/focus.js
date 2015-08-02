'use strict';
var Dispatcher = require('../dispatcher');

var Focus = function (position, content) {
    var payload = {type: 'FOCUS'};
    payload.index = position;
    payload.text = content;
    Dispatcher.dispatch(payload);
    return;
};

module.exports = Focus;
