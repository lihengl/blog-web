"use strict";
var authenticate = require("./authenticate");
var user = require("./user");

var router = require("express").Router({caseSensitive: true, strict: true});


router.use(authenticate);
router.use("/:user", user);


module.exports = router;
