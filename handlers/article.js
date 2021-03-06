var Promise = require('bluebird');
var _ = require('lodash');

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


var handler = function (req, res, next) {
  return query({
    mocking: req.app.get('mocking'),
    path: req.apihost + '/v1/articles/1'
  }).then(validate).then(function (article) {
    return req.app.render({
      initialState: _.assign({
        entries: article.entries,
        title: article.title
      }, res.locals.props),
      og: {
        title: article.title
      },
      pageName: 'ARTICLE',
      title: article.title
    });
  }).then(function (html) {
    return res.status(200).type('text/html').send(html);
  }, next);
};

module.exports = handler;
