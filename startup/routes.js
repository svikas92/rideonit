const express = require('express');
const rides = require('../routes/rides');
const public = require('../routes/public');
const error = require('../middleware/error');
const bodyParser = require("body-parser");

module.exports = function (app) {
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.set('views', __basedir);
	app.use('/api/rides', rides);
	app.use('/', public);
	app.use(error);
}