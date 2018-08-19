if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('./config/express');
const  mongoose = require('./config/mongoose');

var db = mongoose();


const app = express();

const server = app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});

const io = require('socket.io')(server);

io.on('connect', function (socket) {
    socket.on('disconnect', function() {
        console.log('Got disconnect!',socket.id);
    });
});


app.set('socketio', io);

module.exports = app;