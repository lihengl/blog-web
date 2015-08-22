'use strict';
var middleware = function (req, res, next) {
    res.locals.state.layout = 'dashboard';
    res.locals.state.title = 'Settings Dashboard';
    return req.app.render(res.locals.state).then(function (html) {
        return res.status(200).type('text/html').send(html);
    }, next);
};

module.exports = middleware;
