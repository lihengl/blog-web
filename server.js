#!/usr/bin/env node
'use strict';
require('babel/register')({extensions: ['.jsx']});
var Promise = require('bluebird');

var cookie = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var robots = require('robots.txt');

var React = require('react/addons');

var middlewares = require('./middlewares');
var pkg = require('./package.json');

var Root = React.createFactory(require('./components/Root'));

var port = process.env.PORT || 3000;
var mode = process.env.MODE || 'test';


var sources = (mode === 'local') ? [
    'es5-shim/es5-shim.js',
    'es5-shim/es5-sham.js',
    'webpack-dev-server.js',
    [pkg.version, pkg.name].join('/') + '.min.js'
].map(function (source, index, sources) {
    if (index === (sources.length - 2)) { return 'http://localhost:8080/' + source; }
    if (index === (sources.length - 1)) { return 'http://localhost:8080/static_assets/' + source; }
    return ('/node_modules/' + source);
}) : [
    'es5-shim/' + pkg.devDependencies['es5-shim'] + '/es5-shim.min.js',
    'es5-shim/' + pkg.devDependencies['es5-shim'] + '/es5-sham.min.js',
    'lodash.js/' + pkg.dependencies.lodash + '/lodash.min.js',
    'superagent/' + pkg.dependencies.superagent + '/superagent.min.js',
    'react/' + pkg.dependencies.react + '/react-with-addons.min.js',
    [pkg.version, pkg.name].join('/') + '.min.js'
].map(function (source, index, sources) {
    var last = (index === (sources.length - 1));
    var host = (last) ? 'cdn.lihengl.com/blog/' : 'cdnjs.cloudflare.com/ajax/libs/';
    return ('https://' + host + source);
});


var server = express().disable('x-powered-by').enable('strict routing');


server.render = Promise.promisify(function (data, callback) {
    var markup = '<!DOCTYPE html>';

    if (!data.unmanaged) { return callback(new Error('No unmanaged data')); }
    if (!data.managed) { return callback(new Error('No managed data')); }

    data.managed.height = 900;
    data.managed.width = 1440;
    data.resources = sources;

    markup += React.renderToStaticMarkup(Root(data));
    return callback(null, markup);
});


server.set('mode', mode);

server.use(favicon(__dirname + '/favicon.ico'));
server.use(robots(__dirname + '/robots.txt'));

['/static_assets', '/node_modules'].forEach(function (folder) {
    if (mode !== 'local') { return; }
    server.use(folder, express.static(__dirname + folder));
    return;
});

server.use(cookie());
server.use(logger('combined'));

server.use(function (req, res, next) {
    var api = pkg.backend;
    req.apihost = (mode === 'production') ? api.production : api.staging;
    res.locals = {managed: {}, unmanaged: {}};
    res.locals.managed.height = 900;
    res.locals.managed.scroll = 0;
    res.locals.managed.width = 1440;
    return next();
});

server.use(middlewares);

server.use(function (err, req, res, next) {
    var message = [
        'Error: ' + err.message,
        'Where: ' + req.path,
        'State: ' + JSON.stringify(res.locals),
        err.stack
    ].join('\n');
    console.error(message);
    res.status(500).type('text/plain').send(message);
    return next;
});


if (mode === 'local') {
    console.info('[%s] running on localhost:%d ...', pkg.name, port);
    server.listen(port);
} else {
    server.listen(port);
}
