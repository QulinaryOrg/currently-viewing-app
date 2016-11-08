// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

// Configuration
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
require('./routes/routes.js')(app);

// Create server
app.set('port', (process.env.PORT || 8080));
var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// Socket.io
var io = require('socket.io').listen(server);
app.io = io;

module.exports = app;
