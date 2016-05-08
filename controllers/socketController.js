/**
 * Created by shyam on 08/05/16.
 */

"use strict";

module.exports = (app) => {
    let socketService = app.services.socketService;
    let logger = app.helpers.logger;
    
    function addNewConnection(socket) {
        logger.info("Extracting client properties");
        let opts =  {
            address: socket.handshake.address
        };
        socketService.addNewConnection(opts)
            .then(function (devices) {
                logger.info("Broadcasting new devices list");
                socket.emit('device-list-updated',devices);
                socket.broadcast.emit('device-list-updated',devices);
            })
    }

    function removeConnection(socket) {
        logger.info("Extracting client properties");
        let opts =  {
            address: socket.handshake.address
        };
        socketService.removeConnection(opts)
            .then(function (devices) {
                logger.info("Broadcasting updated devices list");
                socket.broadcast.emit('device-list-updated',devices);
            })
    }

    return {
        addNewConnection: addNewConnection,
        removeConnection: removeConnection
    }
}