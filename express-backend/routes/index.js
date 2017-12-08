var express = require('express');
var router = express.Router();

var api = require('./rest')
var image = require('./image')

router.use('/api', api);
router.use('/image', image)

module.exports = router;
