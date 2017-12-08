var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var restful = require('node-restful');
var mongoose = restful.mongoose;

var app = express();

//connect to local database
mongoose.connect('mongodb://localhost/imageData')

//some parsing and loging middleware, probably not required in production
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//enable cross origion requests (CORS)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var index = require('./routes/index');
app.use('/', index);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //return error state
  res.status(err.status || 500);
});

module.exports = app;
