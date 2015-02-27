#!/usr/bin/env node
var favicon = require("serve-favicon");
var express = require("express");
var robots  = require("robots.txt");
var morgan  = require("morgan");
var React   = require("react");

var version = require("./package.json").version;

var Root = React.createFactory(require("./react_components/root"));

var port = process.env.PORT || "3000";
var mode = process.env.MODE || "test";

var server = express().disable("x-powered-by").enable("strict routing");

server.use(favicon(__dirname + "/favicon.ico"));
server.use(robots( __dirname + "/robots.txt"));
server.use(morgan("combined"));

["/bower_components", "/static_assets"].forEach(function (folder) {
    "use strict";
    server.use(folder, express.static(__dirname + folder));
    return;
});

server.get("/", function (req, res) {
    "use strict";
    var source = {title: "A Blog's Title"};
    res.status(200).type("text/html").
        send("<!DOCTYPE html>" + React.renderToStaticMarkup(Root({
        version: version,
        local: (mode === "development"),
        data: source
    })));
    return;
});

if (mode === "test") {
    module.exports = server;
} else if (mode === "development") {
    console.log("server running on http://localhost:%d ...", port);
    server.listen(port);
} else {
    server.listen(port);
}

