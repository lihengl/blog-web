#!/usr/bin/env node
var express = require("express");
var morgan  = require("morgan");
var React   = require("react");

var Page = React.createFactory(require("./component/Page"));

var port = process.env.PORT || "3000";
var mode = process.env.MODE || "test";


var server = express().disable("x-powered-by").enable("strict routing");

server.use(morgan("combined"));

server.get("/", function (req, res) {
    "use strict";
    return res.send(React.renderToString(new Page({
        title: req.query.title
    })));
});


if (mode === "test") {
    module.exports = server;
} else if (mode === "local") {
    console.log("server running on http://localhost:%d ...", port);
    server.listen(port);
} else {
    server.listen(port);
}

