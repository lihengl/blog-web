"use strict";
var ObjectAssign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var Dispatcher   = require("../dispatcher");


var total = 100;


var Count = ObjectAssign({}, EventEmitter.prototype, {
    removeChangeListener: function (callback) {
        this.removeListener("change", callback);
    },
    addChangeListener: function (callback) {
        this.on("change", callback);
    },
    emitChange: function () {
        this.emit("change");
    },
    getTotal: function () {
        return total;
    },
    dispatchToken: Dispatcher.register(function (payload) {
        switch (payload.type) {
            case "INCREMENT":
                total += payload.amount;
                Count.emitChange();
                break;
            default:
                console.log("Ignored Payload: %s", payload.type);
        }
        return true;
    })
});


module.exports = Count;
