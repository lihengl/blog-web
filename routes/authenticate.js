"use strict";

var handler = function (req, res, next) {
    res.locals.state.user = req.cookies;
    return next();
};


module.exports = handler;
