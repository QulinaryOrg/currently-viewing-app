
var IPS = {};

module.exports = function (socket) {
    var user = socket.request.user;

    var ip = socket.handshake.address;
    IPS[ip] = user.username;

    // when new user joins send him the ip list
    socket.emit('init', {
        ips: IPS
    });

    // when new user joins inform others
    socket.broadcast.emit('ip:added', {
        ip: ip,
        ips: IPS
    });

    //on new:post
    socket.on('new:post', function (res) {
        console.log("New post...");
        socket.broadcast.emit('new:post', res);
    });

    // when user disconnects.
    socket.on('disconnect', function () {
        console.log("Trying to disconnect...")
        delete IPS[ip];
        socket.broadcast.emit('ip:removed', {
            ip: ip,
            ips: IPS
        });
    });

};

