"use strict";
var __article__ = require("./__mocks__/article.json");

var Request = require("superagent");
var Promise = require("bluebird");


var query = Promise.promisify(function (param, callback) {
    if (param.mocking) { return callback(null, __article__); }
    return Request.get(param.api).query({
        edit: false
    }).end(function (err, res) {
        if (err) { return callback(err); }
        if (res.ok) { return callback(null, res.body); }
        return callback(new Error(param.api + " status " + res.status));
    });
});

var validate = Promise.promisify(function (result, callback) {
    if (!result.title) { return callback(new Error("invalid")); }
    return callback(null, result);
});


var handler = function (req, res, next) {
    if (!req.app.get("mode")) { return next(new Error("invalid mode")); }
    if (!req.apihost) { return next(new Error("invalid apihost")); }
    return query({
        mocking: (req.app.get("mode") === "local"),
        api: req.apihost + "/v1/articles/1"
    }).then(validate).then(function (result) {
        res.locals.state.title = result.title;
        return req.app.render(res.locals.state);
    }).then(function (html) {
        return res.status(200).type("text/html").send(html);
    }, next);
};

module.exports = handler;
