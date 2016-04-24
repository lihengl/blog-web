var express = require('express');

var authenticate = require('./middlewares/authenticate');

var article = require('./article');
var profile = require('./profile');


var router = express.Router({caseSensitive: true, strict: true});

router.use(authenticate);

router.get('/:user/:profile(settings|setup)', profile);
router.get('/:user/:article', article);


module.exports = router;
