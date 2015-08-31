'use strict';
var router = require('express').Router({caseSensitive: true, strict: true});

var article = require('./article');
var authenticate = require('./authenticate');
var profile = require('./profile');


router.use(authenticate);

router.get('/:user/:profile(settings|setup)', profile);
router.get('/:user/:article', article);


module.exports = router;
