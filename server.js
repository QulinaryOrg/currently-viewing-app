var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// Load DB Config file
var db = require('./config/db');
// Prevent mpromise (mongoose's default promise library) is deprecated warning
mongoose.Promise = global.Promise;
// Connect to MongoDB
mongoose.connect(db.url); 

// Serve static files from the "public" directory.
app.use(express.static('public'));

// Configure routes
require('./app/routes')(app);

// Explicitly listen on 0.0.0.0 so that when 
// running from localhost we get 127.0.0.1 as the IP.
app.listen(3000, '0.0.0.0', function () {
    console.log('currently-viewing-app listening on IP & port 127.0.0.1:3000!');
});
