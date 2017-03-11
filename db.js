var mysql = require('mysql')
var config = require('./config.js')

var connection = mysql.createConnection({
            host: 'localhost',
            user: config.db_user,
            password: config.db_pass
        })

connection.invoke_database = function( config, connection ) {
    connection.connect()
    connection.query( 'CREATE DATABASE IF NOT EXISTS ' + config.db_name, function (err, rows, fields) { })
    connection.query( 'USE ' + config.db_name, function (err, rows, fields) { })
    connection.query( 'CREATE TABLE IF NOT EXISTS user_ip_address (id int(11) auto_increment primary key, ip_address varchar(15) )', function (err, rows, fields) { })
}

module.exports = connection