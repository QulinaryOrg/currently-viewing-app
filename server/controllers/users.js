const liveUsers = require("../models/liveUsers");

exports.handler = (socket) => {
    console.log(socket.id);
    console.log(socket.conn.remoteAddress);
    const clientIP = socket.conn.remoteAddress;
    
    socket.emit('connected', { id: socket.id, IP: socket.conn.remoteAddress });

    liveUsers.find({ip: clientIP}).then(result => {
        if(!result.length) {
            liveUsers.create({ip: clientIP})
                .then(result => {
                    broadcastIPs();
                });
        } else {
            broadcastIPs();
        }
    });

    function broadcastIPs(){
        liveUsers.find().then(results => {
            console.log('broadcasting to all');
            console.log(results);
            const ips = results.map(result => result.ip);
            socket.broadcast.emit('liveUsers', {ips});
            socket.emit('liveUsers', {ips});
        });
    }


    socket.on('disconnect', () => {
        console.log('client disconnected');
        console.log(socket.id);
        console.log(socket.conn.remoteAddress);

        liveUsers.findOneAndRemove({ip: clientIP})
            .then(result => {
                broadcastIPs();
            });
    });
}
