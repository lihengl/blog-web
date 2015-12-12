'use strict';
var DASHBOARD_TITLE = 'Blogger Dashboard';


var handler = function (req, res, next) {
  return req.app.render({
    initialState: Object.assign({
    }, res.locals.props),
    og: {
      title: DASHBOARD_TITLE
    },
    pageName: 'PROFILE',
    title: DASHBOARD_TITLE
  }).then(function (html) {
    return res.status(200).type('text/html').send(html);
  }, next);
};


module.exports = handler;
