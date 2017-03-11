var mysql = require('mysql')
var config = require('./config.js')

var connection = mysql.createConnection({
            host: 'localhost',
            user: config.db_user,
            password: config.db_pass
        })

connection.invoke_database = function( config, connection ) {
    connection.connect(function(err){
    	if (err) throw err
    })
    connection.query( 'CREATE DATABASE IF NOT EXISTS ' + config.db_name, function (err, rows, fields) { })
    connection.query( 'USE ' + config.db_name, function (err, rows, fields) { })
    connection.query( 'CREATE TABLE IF NOT EXISTS ' + config.table_name + ' (id int(11) auto_increment primary key, ip_address varchar(15) )', function (err, rows, fields) { })
}

connection.add_client_ip = function( client_ip ) {
	connection.query( 'INSERT INTO ' + config.table_name + ' (ip_address) VALUES ("' + client_ip + '") ', function(err) {
            if (err) throw err
        })
}

connection.get_current_viewers = function() {
	
}

module.exports = connection