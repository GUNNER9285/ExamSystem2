process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express'),
    app = express(),
    port = process.env.PORT||3000;

app.listen(port);

module.exports = app;

console.log('Server running …');