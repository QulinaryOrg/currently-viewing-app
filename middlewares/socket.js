/**
 * Created by shyam on 08/05/16.
 */

"use strict";

module.exports = (app) => {
    let server = app.middlewares.server;
    var sio = require('socket.io');
    let io = sio.listen(server);
    let logger = app.helpers.logger;

    let socketController = app.controllers.socketController;
    io.on('connection', function (socket) {
        logger.info("New device connected " + socket.handshake.address);
        socket.on('disconnect', function () {
            logger.info("Device dis connected " + socket.handshake.address);
            socketController.removeConnection(socket);
        });
        socketController.addNewConnection(socket);

    });


    return io;
};
