'use strict';
var EventEmitter = require('events').EventEmitter;

var Dispatcher = require('../dispatcher');

var total = 100;


var Count = Object.assign({}, EventEmitter.prototype, {
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    emitChange: function () {
        this.emit('change');
    },
    getTotal: function () {
        return total;
    },
    dispatchToken: Dispatcher.register(function (payload) {
        if (payload.type === 'INCREMENT') {
            total += payload.amount;
            Count.emitChange();
        } else {
            console.log('CountStore Ignored: %s', payload.type);
        }

        return true;
    })
});


module.exports = Count;
