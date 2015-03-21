"use strict";
var __article__ = require("./__mocks__/article.json");

var Request = require("superagent");
var Promise = require("bluebird");

var router = require("express").Router({caseSensitive: true, strict: true});


var fetch = Promise.promisify(function (param, callback) {
    if (param.mode === "local") { return callback(null, __article__); }
    return Request.get(param.url).query({
        edit: false
    }).end(function (err, response) {
        if (err) { return callback(err); }
        if (response.ok) { return callback(null, response.body); }
        return callback(new Error(param.url + " returns " + response.status));
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
