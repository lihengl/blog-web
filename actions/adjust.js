"use strict";
var Dispatcher = require("../dispatcher");

var Adjust = {
    increment: function (amount) {
        Dispatcher.dispatch({
            amount: amount,
            type: "ADJUST_INCREMENT"
        });
        return;
    }
};

module.exports = Adjust;
