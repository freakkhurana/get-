var express = require('express');
var path = require('path');
var favicon = require('server-favicon');
var logger = require('morgan');
var body-parser = require('body-parser');

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://test:testify123@ds113452.mlab.com:13452/todoapp', { useMongoClient: true, promiseLibrary: require('bluebird')});

var book = require('./routes/book');
var app = express();



app.use(logger('dev'));
app.use(body-parser.json());
app.use(body-parser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/book', book);
app.use(function (req, res, next) {
	var err = new Error('not found');
	err.status = 404;
	next(err);
	// body...
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
	// body...
});

module.exports = app;