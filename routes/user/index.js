"use strict";
var settings = require("./settings");
var article  = require("./article");

var router = require("express").Router({caseSensitive: true, strict: true});


router.get("/settings", settings);
router.get("/:article", article);


module.exports = router;
