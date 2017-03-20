var mysql = require('mysql')
var config = require('./config.js')

var connection = mysql.createConnection({
            host: 'localhost',
            user: config.db_user,
            password: config.db_pass
        })

connection.invoke_database = function() {
    connection.connect(function(err){
    	if (err) throw err
    })
    connection.query( 'CREATE DATABASE IF NOT EXISTS ' + config.db_name, function (err, rows, fields) { })
    connection.query( 'USE ' + config.db_name, function (err, rows, fields) { })
    connection.query( 'CREATE TABLE IF NOT EXISTS ' + config.table_name + ' (id int(11) auto_increment primary key, ip_address VARCHAR(15), user_agent VARCHAR(100) )', function (err, rows, fields) { })
}

connection.add_client_ip = function( client, cookies ) {
	connection.query( 'INSERT INTO ' + config.table_name + '(ip_address,user_agent) VALUES ("' + client.client_ip + '", "' + client.user_agent + '") ', function(err, response) {
            if (err)
            	throw err
            else
            	cookies.set( 'client_id', response.insertId );
        })
}

connection.delete_client_ip = function( client_id, cookies ) {
	connection.query( 'DELETE FROM ' + config.table_name + ' WHERE id = "' + client_id + '"', function(err, response) {
            if (err)
            	throw err
            else
            	cookies.set( 'client_id', null );
        })
}

connection.get_current_viewers = function() {
	
}

connection.invoke_database()

module.exports = connection