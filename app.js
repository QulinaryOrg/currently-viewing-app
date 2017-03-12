var express = require('express')
var app = express()
var config = require('./config.js')
var db_conn = require('./db.js')
var Cookies = require('cookies');

var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
        var cookies = new Cookies(req, res)
        var client_ip = cookies.get('client_ip')
        if( typeof client_ip === 'undefined' ) {
            client_ip = get_client_ip( req )
            db_conn.add_client_ip( client_ip )
            cookies.set( 'client_ip', client_ip );
        }

        db_conn.query( 'SELECT ip_address FROM ' + config.table_name, function (err, result) {
            if (err) 
                throw err
            else
                res.render('index', {'client_records' : result })            
        })
        
        req.on('close', function(){
            console.log('Client closed the connection');
        });
})

db_conn.invoke_database( config, db_conn )

function get_client_ip(req){
    var client_ip = req.connection.remoteAddress
    client_ip = client_ip.split(':').pop()
    return client_ip == '1' ? '127.0.0.1': client_ip;
}

app.listen( config.application_port, function(err) {
    if(err) {
        console.log('Error binding this port. Please try with different port');
        throw err
    } 
});
