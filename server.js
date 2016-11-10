var express 			= require('express');
var currentlyViewing 	= require('./server/currently-viewing');
var app 				= express();
var server 				= require('http').Server(app);
var port 				= process.env.PORT || 8080;

app.use(express.static(__dirname + '/web'));

currentlyViewing.start(server);

server.listen(port, function() {
  console.log('server up and running on port ' + port);
});