'use strict';
var Promise = require('bluebird');

var __article__ = require('./__mocks__/article.json');
var superagent = require('superagent');


var query = Promise.promisify(function (parameter, callback) {
    var message = parameter.path + ' Returns Status: ';
    if (parameter.mocking) { return callback(null, __article__); }
    return superagent.get(parameter.path).end(function (err, res) {
        if (err) { return callback(err); }
        if (res.ok) { return callback(null, res.body); }
        return callback(new Error(message + res.status));
    });
});

var validate = Promise.promisify(function (response, callback) {
    var message = null;
    ['entries', 'title'].forEach(function (field) {
        if (message !== null) { return; }
        if (!response[field]) { message = ('Missing \'' + field + '\''); }
        return;
    });
    if (message !== null) { return callback(new Error(message)); }
    return callback(null, response);
});


var middleware = function (req, res, next) {
    var message = null;
    if (!req.app.get('mode')) { message = 'Missing Application Mode'; }
    if (!req.apihost) { message = 'Missing API Host'; }
    if (message !== null) { return next(new Error(message)); }
    return query({
        mocking: (req.app.get('mode') === 'local'),
        path: req.apihost + '/v1/articles/1'
    }).then(validate).then(function (result) {
        res.locals.unmanaged.title = result.title;
        res.locals.managed.article = result;
        res.locals.managed.tagline = 'Hello, world?';
        res.locals.managed.title = result.title;
        return req.app.render(res.locals);
    }).then(function (html) {
        return res.status(200).type('text/html').send(html);
    }, next);
};

module.exports = middleware;
