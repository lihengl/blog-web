"use strict";
var __comments__ = require("./__mocks__/comments.json");

var Dispatcher = require("../dispatcher");
var Request    = require("superagent");


var Fetch = function (user, mocking) {
    var payload = {type: "FETCH_START"};

    Dispatcher.dispatch(payload);

    if (mocking === true) {
        payload.comments = __comments__;
        payload.type = "FETCH_FINISHED";
        Dispatcher.dispatch(payload);
        return;
    }

    Request.get("http://localhost:3000/").end(function (err, res) {
        if (err || !res.ok) {
            payload.error = err || new Error("Status: " + res.status);
            payload.type = "FETCH_FAILED";
            Dispatcher.dispatch(payload);
            return;
        }
        payload.comments = res.body;
        payload.type = "FETCH_FINISHED";
        Dispatcher.dispatch(payload);
        return;
    });

    return;
};

module.exports = Fetch;
