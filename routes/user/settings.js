"use strict";
var handler = function (req, res, next) {
    res.locals.state.title = "Settings Page";
    return req.app.render(res.locals.state).then(function (html) {
        return res.status(200).type("text/html").send(html);
    }, next);
};

module.exports = handler;
