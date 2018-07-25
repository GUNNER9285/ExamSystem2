process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express'),
    mongoose = require('./config/mongoose'),
    passport = require('./config/passport');

var db = mongoose(),
    app = express(),
    port = process.env.PORT||3000;
var passport = passport();


app.listen(port);

module.exports = app;

console.log('Server running …');