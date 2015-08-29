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


var bundle = [pkg.version, pkg.name].join('/');

var resources = (mode === 'local') ? [
    '/node_modules/es5-shim/es5-shim.js',
    '/node_modules/es5-shim/es5-sham.js',
    'http://localhost:8080/webpack-dev-server.js',
    'http://localhost:8080/static_assets/' + bundle + '.js'
] : [
    'es5-shim/' + pkg.devDependencies['es5-shim'] + '/es5-shim.min.js',
    'es5-shim/' + pkg.devDependencies['es5-shim'] + '/es5-sham.min.js',
    'lodash.js/' + pkg.dependencies.lodash + '/lodash.min.js',
    'superagent/' + pkg.dependencies.superagent + '/superagent.min.js',
    'react/' + pkg.dependencies.react + '/react-with-addons.min.js',
    bundle + '.min.js'
].map(function (resource, index, resources) {
    var last = (index === (resources.length - 1));
    var host = (last) ? 'cdn.lihengl.com/blog/' : 'cdnjs.cloudflare.com/ajax/libs/';
    return ('https://' + host + resource);
});

var server = express().disable('x-powered-by').enable('strict routing');

server.render = Promise.promisify(function (initialData, callback) {
    var markup = '<!DOCTYPE html>';

    initialData.managed.height = 900;
    initialData.managed.width = 1440;
    initialData.resources = resources;

    markup += React.renderToStaticMarkup(Root(initialData));
    return callback(null, markup);
});


server.set('mocking', (mode === 'local'));

['/static_assets', '/node_modules'].forEach(function (folder) {
    if (mode !== 'local') { return; }
    server.use(folder, express.static(__dirname + folder));
    return;
});

server.use(favicon(__dirname + '/favicon.ico'));
server.use(robots(__dirname + '/robots.txt'));
server.use(logger('combined'));
server.use(cookie());

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
    console.error('where: ' + req.path);
    console.error('state: ' + JSON.stringify(res.locals));
    console.error('error: ' + err.stack);
    res.status(500).type('text/plain').send(err.message);
    return next;
});


if (mode === 'local') {
    console.info('[%s] running on localhost:%d ...', pkg.name, port);
    server.listen(port);
} else {
    server.listen(port);
}
