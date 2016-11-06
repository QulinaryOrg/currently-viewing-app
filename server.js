var express = require('express');
var path = require('path');
var app = express();
var http = require('http');
var server = http.Server(app)

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

server.listen(3000, function(){
	console.log("Magic on port 3000");
})

var io = require('socket.io')(server);


var connections = [];

io.sockets.on('connection', function(socket){
	var ipRaw = socket.request.connection._peername.address;
	var ipAddress = ipRaw.substr(0,7) == "::ffff:"?  ipRaw.substr(7) : "localhost";
	var ipInfos = {};

	http.get("http://ip-api.com/json/"+ipAddress, function(res) {
		var body = '';
		res.on('data', function(chunk){
			body += chunk;
		});

		res.on('end', function(){
			ipInfos = JSON.parse(body);
			connections.push({id:socket.id, address: ipAddress, infos :ipInfos})
			io.emit('connections', connections);
		});
	}).on('error', function(e){
		console.log('error', e)
	});

	//disconnect
	socket.on('disconnect', function(data){
		connections.map(function(e){
			if(e.id === socket.id) { return connections.splice(connections.indexOf(e), 1)}; 
		})
		io.emit('connections', connections);
	})
})

