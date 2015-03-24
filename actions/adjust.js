"use strict";
var Dispatcher = require("../dispatcher");

var Adjust = {
    increment: function (amount) {
        var payload = {
            amount: amount,
            type: "ADJUST_INCREMENT"
        };
        Dispatcher.dispatch(payload);
        return;
    }
};

module.exports = Adjust;
