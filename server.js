#!/usr/bin/env node
"use strict";
var cookieParser = require("cookie-parser");
var serveFavicon = require("serve-favicon");

var express = require("express");
var logger  = require("morgan");
var robots  = require("robots.txt");

var React   = require("react");

var pkg = require("./package.json");

var Root = React.createFactory(require("./react_components/root"));

var port = process.env.PORT || "3000";
var mode = process.env.MODE || "test";

var server = express().disable("x-powered-by").enable("strict routing");

server.set("mode", mode);

server.use(serveFavicon(__dirname + "/favicon.ico"));
server.use(robots(__dirname + "/robots.txt"));

["/node_modules", "/static_assets"].forEach(function (folder) {
    if (mode !== "local") { return; }
    server.use(folder, express.static(__dirname + folder));
    return;
});

server.use(cookieParser());
server.use(logger("combined"));

server.get("/", function (req, res) {
    var data = {title: "A BLOG'S NAME"};
    res.status(200).type("text/html").
        send("<!DOCTYPE html>" + React.renderToStaticMarkup(Root({
        cdnized: (mode !== "local"),
        state: data,
        app: (pkg.name + "-" + pkg.version + ".min.js")
    })));
    return;
});

if (mode === "test") {
    module.exports = server;
} else if (mode === "local") {
    console.log("[%s] running on localhost:%d ...", pkg.name, port);
    server.listen(port);
} else {
    server.listen(port);
}
