"use strict";
var Dispatcher = require("../dispatcher");

var Request = require("superagent");


var FetchAction = {
    comments: function (user) {
        var url = "http://localhost:3000/";
        Dispatcher.dispatch({
            type: "FETCH_COMMENTS_REQUEST"
        });
        return Request.get(url).end(function (err, response) {
            if (err) { return console.log(err); }
            Dispatcher.dispatch({
                homepage: response.body,
                user: user,
                type: "FETCH_COMMENTS_RECEIVE"
            });
        });
    }
};

module.exports = FetchAction;
