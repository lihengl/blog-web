'use strict';
var middleware = function (req, res, next) {
    // res.locals.managed.user = req.cookies;
    res.locals.managed.user = {alias: 'lihengl', id: 0};
    next();
};


module.exports = middleware;
