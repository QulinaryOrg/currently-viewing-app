const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

let whois = require('./services/storage');

app.use(morgan('combined'));

// routes
app.get('/', (req, res) => {
  res.send({ 'echo': 'server!' });
});

io.use((socket, next) => {
  let handshake = socket.handshake;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  whois.push(socket.id, socket.handshake);
  io.emit('connections', whois.connections());

  socket.on('disconnect', () => {
    console.log('user disconnected');
    whois.pop(socket.id);
    io.emit('connections', whois.connections());
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('Server listening on:', port);
});

module.exports = server; // for testing ...
