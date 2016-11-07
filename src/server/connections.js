/**
 * This module handles connections from (socket.io) clients.
 * It counts every connect/disconnect event, and broadcast the amount of currently connected clients
 * to all the other clients;
 */

'use strict';
var io;
var clients = {};

/**
 * Called when a client connects (using socketio)
 * @param clientAddress
 */
function clientConnected(clientAddress) {
  clients[clientAddress] = clients.hasOwnProperty(clientAddress) ? clients[clientAddress] + 1 : 1;
  console.log("Connected from: " + JSON.stringify(clientAddress) + ", new amount=" + clients[clientAddress]);
  io.emit('update_ip_list', clients);
}

/**
 * Called when a client disconnects (using socketio)
 * @param clientAddress
 */
function clientDisconnected(clientAddress) {
  if (1 === clients[clientAddress]) {
    delete clients[clientAddress];
  } else {
    clients[clientAddress] -= 1;
  }
  //console.log("Disconnected from: " + JSON.stringify(clientAddress) + ", new amount=" + clients[clientAddress]);
  io.emit('update_ip_list', clients);
}

function init(httpServer) {
  io = require('socket.io')(httpServer);

  io.on('connection', function (socket) {
    console.log('a user connected from ' + JSON.stringify(socket.request.connection.remoteAddress));
    clientConnected(socket.request.connection.remoteAddress);
    socket.on('disconnect', function () {
      console.log('a user disconnected from ' + JSON.stringify(socket.request.connection.remoteAddress));
      clientDisconnected(socket.request.connection.remoteAddress);
    });
  });
}

module.exports = init;
