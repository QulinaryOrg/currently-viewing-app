/**
 * Created by shyam on 08/05/16.
 */

"use strict";

module.exports = (app) => {

    let logger = app.helpers.logger;
    let connectedDevices = new Set();
    function addNewConnection(opts) {
        return new Promise(function (resolve, reject) {
            logger.info("Adding new device to connection "+ opts.address);
            connectedDevices.add(opts.address);
            logger.info("Total device connected " + connectedDevices.size);
            resolve(Array.from(connectedDevices));
        });
    }

    function removeConnection(opts) {
        return new Promise(function (resolve, reject) {
            logger.info("Removing device to connection "+ opts.address);
            connectedDevices.delete(opts.address);
            logger.info("Total device connected " + connectedDevices.size);
            resolve(Array.from(connectedDevices));
        });
    }
    
    return {
        addNewConnection: addNewConnection,
        removeConnection: removeConnection
    }
}