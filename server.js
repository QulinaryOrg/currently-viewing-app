var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// Load DB Config file
var db = require('./config/db');
// Connect to MongoDB
mongoose.connect(db.url); 

// Serve static files from the "public" directory.
app.use(express.static('public'));

// Configure routes
require('./app/routes')(app);

// running from localhost we get 127.0.0.1 as the IP.
app.listen(3000, '127.0.0.1', function () {
    console.log('currently-viewing-app listening on port 127.0.0.1:3000!');
});
