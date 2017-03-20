var app = require('express')();
var server = require('http').createServer(app)
var config = require('./config.js')

server.listen(config.application_port);

var db_conn = require('./db.js')
var Cookies = require('cookies');
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
    var cookies = new Cookies(req, res)
    var client_id = cookies.get('client_id')
    if( typeof client_id === 'undefined' ) {
        client = get_client( req )
        db_conn.add_client_ip( client, cookies )
    }

    db_conn.query( 'SELECT ip_address,user_agent FROM ' + config.table_name, function (err, result) {
        if (err) 
            throw err
        else
            res.render('index', {'client_records' : result })            
    })
})

function get_client(req){
    var user_agent = req.headers['user-agent'];
    var client_ip = req.connection.remoteAddress
    client_ip = client_ip.split(':').pop()
    client_ip == '1' ? '127.0.0.1': client_ip;
    return {'client_ip' : client_ip, 'user_agent' : user_agent }
}
