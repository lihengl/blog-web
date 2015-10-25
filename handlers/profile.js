var profile = function (req, res, next) {
  var head = {title: 'Settings Dashboard', og: {}};
  var body = Object.assign({}, res.locals.props);
  return req.app.render(head, body).then(function (html) {
    return res.status(200).type('text/html').send(html);
  }, next);
};

module.exports = profile;
