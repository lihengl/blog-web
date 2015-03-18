"use strict";
var router = require("express").Router({caseSensitive: true, strict: true});


router.get("/", function (req, res, next) {
    res.locals.state = {title: req.ip};
    return req.app.render(res.locals.state).then(function (html) {
        return res.status(200).type("text/html").send(html);
    }, next);
});


module.exports = router;
