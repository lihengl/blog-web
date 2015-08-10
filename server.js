#!/usr/bin/env node
'use strict';
require('babel/register')({extensions: ['.jsx']});
Promise = require('bluebird');

var cookie = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var robots = require('robots.txt');

var React = require('react/addons');

var routes = require('./routes');
var pkg = require('./package.json');

var Root = React.createFactory(require('./components/Root'));

var port = process.env.PORT || '3000';
var mode = process.env.MODE || 'test';


var sources = (mode === 'local') ? [
    'es5-shim/es5-shim.js',
    'es5-shim/es5-sham.js',
    'immutable/dist/immutable.js',
    'react/dist/react-with-addons.js',
    [pkg.version, pkg.name].join('/') + '.min.js'
].map(function (source, index, sources) {
    var last = (index === (sources.length - 1));
    return ((last) ? '/static_assets/' : '/node_modules/') + source;
}) : [
    'es5-shim/' + pkg.devDependencies['es5-shim'] + '/es5-shim.min.js',
    'es5-shim/' + pkg.devDependencies['es5-shim'] + '/es5-sham.min.js',
    'immutable/' + pkg.dependencies.immutable + '/immutable.min.js',
    'react/' + pkg.dependencies.react + '/react-with-addons.min.js',
    [pkg.version, pkg.name].join('/') + '.min.js'
].map(function (source, index, sources) {
    var last = (index === (sources.length - 1));
    var host = (last) ? 'cdn.lihengl.com/blog/' : 'cdnjs.cloudflare.com/ajax/libs/';
    return ('https://' + host + source);
});


var server = express().disable('x-powered-by').enable('strict routing');

server.render = Promise.promisify(function (metadata, data, callback) {
    var markup = React.renderToStaticMarkup(Root({
        data: data,
        metadata: metadata,
        sources: sources
    }));
    callback(null, ('<!DOCTYPE html>' + markup));
    return;
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
    var api = pkg.apihost;
    req.apihost = (mode === 'production') ? api.production : api.staging;
    res.locals.state = {};
    return next();
});

server.use(routes);

server.use(function (err, req, res, next) {
    var message = [
        'Error: ' + err.code,
        'Where: ' + req.path,
        'State: ' + JSON.stringify(res.locals.state),
        err.stack
    ].join('\n');
    console.error(message);
    res.status(500).type('text/plain').send(message);
    return next;
});


if (mode === 'test') {
    module.exports = server;
} else if (mode === 'local') {
    console.log('[%s] running on localhost:%d ...', pkg.name, port);
    server.listen(port);
} else {
    server.listen(port);
}
