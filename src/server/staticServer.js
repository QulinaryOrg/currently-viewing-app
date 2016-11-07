/**
 * This module serves a directory in HTTP using express
 */

'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);


function startServer(port, dir) {
  app.use(express.static(dir));

  http.listen(port, function () {
    console.log('listening on *:' + port);
  });
}


module.exports = {
  startServer: startServer,
  http: http
};
