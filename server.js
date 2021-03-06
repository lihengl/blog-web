require('babel-register')({extensions: ['.jsx', '.js']});
var Promise = require('bluebird');
var _ = require('lodash');

var cookie = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var robots = require('robots.txt');

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var routes = require('./handlers/router');
var pkg = require('./package.json');

var HtmlDocument = React.createFactory(require('./components/HtmlDocument').default);

var mode = process.env.MODE || 'test';
var port = process.env.PORT || 3000;


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
  bundle + '.min.js'
].map(function (resource, index, resources) {
  var last = (index === (resources.length - 1));
  var host = (last) ? 'cdn.lihengl.com/blog/' : 'cdnjs.cloudflare.com/ajax/libs/';
  return ('https://' + host + resource);
});

var server = express().disable('x-powered-by').enable('strict routing');

server.render = Promise.promisify(function (pageData, callback) {
  var initialProps = _.assign(pageData, {resources: resources});
  var pageComponent = HtmlDocument(initialProps);
  var renderOutput = ReactDOMServer.renderToStaticMarkup(pageComponent);
  return callback(null, '<!DOCTYPE html>' + renderOutput);
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
  res.locals.props = {height: 900, scroll: 0, timestamp: 0, width: 1440};
  return next();
});

server.use(routes);

server.use(function (err, req, res, next) {
  console.error('State: ' + JSON.stringify(res.locals));
  console.error(err.stack);
  res.status(500).type('text/plain').send(err.message);
  return next;
});


if (mode === 'local') {
  console.info('[%s] running on localhost:%d ...', pkg.name, port);
  server.listen(port);
} else {
  server.listen(port);
}
