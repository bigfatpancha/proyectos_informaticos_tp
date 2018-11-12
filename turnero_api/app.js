var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var specialtiesRouter = require('./routes/specialties');
var schedulesRouter = require('./routes/schedule');
var appointmentsRouter = require('./routes/appointment');

var db = require('./models');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
  req.db = db;
  next();  
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/specialties', specialtiesRouter);
app.use('/schedule', schedulesRouter);
app.use('/appointment', appointmentsRouter);

console.log("listening on port 3000");

module.exports = app;
