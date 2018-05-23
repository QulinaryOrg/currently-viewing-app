import express from 'express';
import path from 'path';
import http from 'http';
import SocketIo from 'socket.io';
import ipFromSocket from './ipFromSocket';
import createIpTracker from './createIpTracker';

const app = express();
const server = http.Server(app);
const io = SocketIo(server);

app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

const ipListChange = (ips, socket) => {
  socket.broadcast.emit('ips', ips);
};

const ipTracker = createIpTracker(ipListChange);

io.on('connect', socket => {
  const ip = ipFromSocket(socket);

  ipTracker.handleConnect(ip, socket);

  socket.on('disconnect', () => {
    ipTracker.handleDisconnect(ip, socket);
  });

  socket.emit('own-ip', ip);
  socket.emit('ips', ipTracker.getIps());
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
