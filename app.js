var express = require('express')
var app = express()
var http = require('http')
var config = require('./config.js')
var db_conn = require('./db.js')
var server = http.createServer(app);

app.get('/', function (req, res) {
        var client_address = get_client_address( req )
        var currently_viewing = []
        db_conn.query( 'INSERT INTO user_ip_address(ip_address) VALUES ("' + client_address + '") ' )
        db_conn.query( 'SELECT ip_address FROM user_ip_address', function (err, rows, fields) { 
            for (var i = rows.length - 1; i >= 0; i--) {
                rows[i]
            }
        });
        res.send('Hello World!')
})

db_conn.invoke_database( config, db_conn )

function get_client_address(request){
    var ip = request.connection.remoteAddress
    ip = ip.split(':').pop()
    return ip == '1' ? '127.0.0.1': ip;
}

app.on('close', function (parent) {
  console.log('Admin UNMounted');
});

server.on('disconnect', function() {
  console.log(' Stopping ...');
});

app.listen(3000);
