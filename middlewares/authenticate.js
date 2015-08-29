'use strict';
var middleware = function (req, res, next) {
    res.locals.managed.user = req.cookies;
    next();
};


module.exports = middleware;
