'use strict';
var middleware = function (req, res, next) {
    res.locals.state.user = req.cookies;
    next();
};


module.exports = middleware;
