var express = require('express');
var router = express.Router();

var images = require('../models/image');

images.methods(['get','put', 'post', 'delete']);

images.register(router, '/images');

module.exports = router;
