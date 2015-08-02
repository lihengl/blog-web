'use strict';
var middleware = function (req, res, next) {
    res.locals.state.user = req.cookies;
    return next();
};


module.exports = middleware;
