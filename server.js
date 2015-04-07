#!/usr/bin/env node
"use strict";
var express = require("express");
var favicon = require("serve-favicon");
var cookie  = require("cookie-parser");
var logger  = require("morgan");
var robots  = require("robots.txt");

var Promise = require("bluebird");
var React   = require("react/addons");

var routes = require("./routes");
var pkg    = require("./package.json");

var Root = React.createFactory(require("./react_components/root"));

var port = process.env.PORT || "3000";
var mode = process.env.MODE || "test";

var localhost = {
    app: "/static_assets",
    lib: "/node_modules"
};

var libraries = (mode === "local") ? [
    "/es5-shim/es5-shim.js",
    "/es5-shim/es5-sham.js",
    "/immutable/dist/immutable.js",
    "/react/dist/react-with-addons.js"
].map(function (path) {
    return (localhost.lib + path);
}) : [
    "/es5-shim/" + pkg.devDependencies["es5-shim"] + "/es5-shim.min.js",
    "/es5-shim/" + pkg.devDependencies["es5-shim"] + "/es5-sham.min.js",
    "/immutable/" + pkg.dependencies.immutable + "/immutable.min.js",
    "/react/" + pkg.dependencies.react + "/react-with-addons.min.js"
].map(function (path) {
    return (pkg.cdnhost.lib + path);
});

var bundle = [
    (mode === "local") ? localhost.app : pkg.cdnhost.app,
    pkg.version,
    pkg.name + ".min.js"
].join("/");


var server = express().disable("x-powered-by").enable("strict routing");

server.render = Promise.promisify(function (data, callback) {
    if (!data || !data.title) { return callback(new Error("Invalid Data!")); }
    var markup = React.renderToStaticMarkup(Root({
        libraries: libraries,
        bundle: bundle,
        data: data
    }));
    return callback(null, ("<!DOCTYPE html>" + markup));
});

server.set("mode", mode);

server.use(favicon(__dirname + "/favicon.ico"));
server.use(robots(__dirname + "/robots.txt"));

[localhost.app, localhost.lib].forEach(function (folder) {
    if (mode !== "local") { return; }
    server.use(folder, express.static(__dirname + folder));
    return;
});

server.use(cookie());
server.use(logger("combined"));

server.use(function (req, res, next) {
    var api = pkg.apihost;
    req.apihost = (mode === "production") ? api.production : api.staging;
    res.locals.state = {};
    return next();
});

server.use(routes);

server.use(function (err, req, res, next) {
    var message = [
        "Error: " + err.code,
        "Where: " + req.path,
        "State: " + JSON.stringify(res.locals.state),
        err.stack
    ].join("\n");
    console.error(message);
    res.status(500).type("text/plain").send(message);
    return next;
});


if (mode === "test") {
    module.exports = server;
} else if (mode === "local") {
    console.log("[%s] running on localhost:%d ...", pkg.name, port);
    server.listen(port);
} else {
    server.listen(port);
}
