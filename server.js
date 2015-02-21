#!/usr/bin/env node
var favicon = require("serve-favicon");
var express = require("express");
var robots  = require("robots.txt");
var morgan  = require("morgan");
var React   = require("react");

var manifest = require("./package.json");

var Page = React.createFactory(require("./build/Page"));
var Blog = React.createFactory(require("./build/Blog"));

var port = process.env.PORT || "3000";
var mode = process.env.MODE || "test";


var server = express().disable("x-powered-by").enable("strict routing");

server.use(favicon(__dirname + "/favicon.ico"));
server.use(robots( __dirname + "/robots.txt"));
server.use(morgan("combined"));

["/bower_components", "/static"].forEach(function (folder) {
    "use strict";
    server.use(folder, express.static(__dirname + folder));
    return;
});

server.get("/", function (req, res) {
    "use strict";
    var title = "Blog Web Application";
    res.status(200).type("text/html").
        send("<!DOCTYPE html>" + React.renderToStaticMarkup(new Page({
        content: React.renderToString(new Blog({title: title})),
        version: manifest.version,
        local: (mode === "local"),
        title: title
    })));
    return;
});


if (mode === "test") {
    module.exports = server;
} else if (mode === "local") {
    console.log("server running on http://localhost:%d ...", port);
    server.listen(port);
} else {
    server.listen(port);
}

