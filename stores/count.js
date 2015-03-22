"use strict";
var ObjectAssign = require("object-assign");
var EventEmitter = require("events").EventEmitter;

var Dispatcher   = require("../dispatcher");


var total = 100;


var CountStore = ObjectAssign({}, EventEmitter.prototype, {
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
    dispatcherIndex: Dispatcher.register(function (payload) {
        switch (payload.type) {
            case "ADJUST_INCREMENT":
                total += payload.amount;
                CountStore.emitChange();
                break;
            default:
                console.log("ignored: %s", payload.type);
        }
        return true;
    })
});


module.exports = CountStore;
