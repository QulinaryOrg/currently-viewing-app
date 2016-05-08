/**
 * Created by shyam on 08/05/16.
 */
(function() {
    var socket = app.io = io();
    socket.on('device-list-updated', function (data) {
        console.log("device list updated");
        console.log(data);
        app.controller.updateDeviceList(data);
    });
})()