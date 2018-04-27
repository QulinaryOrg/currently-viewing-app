const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const whois = require('./services/storage');
console.log(whois.ipList)

app.use(morgan('combined'));

// routes
app.get('/', (req, res) => {
  // res.send({ 'Hello': 'World!' });
  res.sendFile(__dirname + '/index.html');
});

io.use((socket, next) => {
  let handshake = socket.handshake;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  console.log(socket.handshake);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('Server listening on:', port);
});

module.exports = server; // for testing ...
