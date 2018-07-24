var express = require('express'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    validtor = require('express-validator'),
    session = require('express-session'),
    config = require('./config');

module.exports = function () {
    var app = express();

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }
    else{
        app.use(compression);
    }
    app.use(session({
        secret: 'config.sessionSecret',
        resave: false,
        saveUninitialized: true
    }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(validtor());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.routes')(app);
    require('../app/routes/user.routes')(app);

    app.use(express.static('./public'));
    return app;
};