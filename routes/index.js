"use strict";
var __article__ = require("./__mocks__/article.json");

var Promise = require("bluebird");
var request = require("request");

var router = require("express").Router({caseSensitive: true, strict: true});


var fetch = Promise.promisify(function (param, callback) {
    if (param.mode === "local") { return callback(null, __article__); }
    return request.get({url: param.url, qs: {
        edit: false
    }}, function (err, head, body) {
        if (err) { return callback(err); }
        if (head.statusCode === 200) { return callback(null, body); }
        return callback(new Error(param.url + " returns " + head.statusCode));
    });
});

var filter = Promise.promisify(function (response, callback) {
    if (!response.title) { return callback(new Error("invalid")); }
    return callback(null, response);
});


router.route("/").get(function (req, res, next) {
    return fetch({
        mode: req.app.get("mode"),
        url: req.api + "/v1/articles/1"
    }).then(filter).then(function (response) {
        res.locals.state.title = response.title;
        return req.app.render(res.locals.state);
    }).then(function (html) {
        return res.status(200).type("text/html").send(html);
    }, next);
});


module.exports = router;
