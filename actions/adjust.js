"use strict";
var Dispatcher = require("../dispatcher");

var AdjustAction = {
    increment: function (amount) {
        Dispatcher.dispatch({
            amount: amount,
            type: "ADJUST_INCREMENT"
        });
        return;
    }
};

module.exports = AdjustAction;
