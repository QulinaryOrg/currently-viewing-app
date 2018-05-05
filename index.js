var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'page.html'));
});
app.use(express.static('public'));

var socketIPs = [],
	socketIDs = [],
    sockets = [];

io.on('connection', socket => {
  let sockIP = getIpFromSocket(socket);
  sockets[socket.id] = socket;
  socketIPs.push(sockIP);
  socketIDs.push(socket.id);

  socket.on('disconnect', reason => {
	delete socket[socket.id];
	socketIPs.splice(socketIPs.indexOf(getIpFromSocket(socket)), 1);
	socketIDs.splice(socketIPs.indexOf(getIpFromSocket(socket)), 1);
	sendSocketsList();
  });

  sendSocketsList();
});

function sendSocketsList() {

	for (let k in sockets) {
	  	sockets[k].emit('message', {ips: socketIPs, ids: socketIDs});
	}
}

function getIpFromSocket(socket) {
	return socket.handshake.headers.host.indexOf('localhost') > -1 ? '127.0.0.1' : socket.handshake.headers.host.split(':')[0]
}
http.listen(4500, () => console.log('listening on http://localhost:4500/'));