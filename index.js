'use strict';

const config = require('./config');
const Hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const InMemory = require('./db/in-memory-db');

//This can be based on config / environment..
const db = new InMemory();

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true,
      response: {
        modify: true, //joi options
        options: {
          stripUnknown: true
        }
      }
    }
  }
});

server.connection({
  host: config.get("server:host"),
  port: Number(config.get("server:port"))
});

var io = require('socket.io')(server.listener);

io.on('connection', function (socket) {

  db.addIp(socket.request.socket.remoteAddress);

  io.emit('list',{list:db.getList()});

  socket.on('disconnect', function(){
    db.removeIp(socket.request.socket.remoteAddress);

    io.emit('list',{list:db.getList()});
  });
});




server.register([
  inert,
  vision
], function (err) {
  if(err) {
    console.error('failed to load plugin ', err);
    throw err;
  }

  server.route({
    path:"/",
    method: "GET",
    handler: {
      file: 'index.html'
    }
  });

  server.start(function () {
    console.log("server started at", server.info);
  });
});



