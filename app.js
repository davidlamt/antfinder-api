import bodyParser from 'body-parser';
import express from 'express';
import cors from 'express-cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-session';

const mongoStore = require('connect-mongo')(session);
let allowedOrigins = [];

require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.DB_INFO);
    allowedOrigins.push('antfinder.herokuapp.com');
} else {
    mongoose.connect('mongodb://localhost/antfinder');
    allowedOrigins.push('localhost:3001');
}

const authenticate = require('./routes/authenticate');
const listings = require('./routes/listings');
const login = require('./routes/login');
const logout = require('./routes/logout');
const user = require('./routes/user');
const users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60 // Expires after one hour
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
    })
}));
app.use(cors({ allowedOrigins }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authenticate', authenticate);
app.use('/listings', listings);
app.use('/login', login);
app.use('/logout', logout);
app.use('/user', user);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
  next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
