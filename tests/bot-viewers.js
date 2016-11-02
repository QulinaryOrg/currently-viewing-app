
var supertest	= require('supertest-as-promised');
var server	= require('../server.js');
var request	= supertest('localhost:'+server.port);

function removeViewer(ip) {
    console.log('Closed viewer with IP', ip);
    request.get('/api/ipaddress/remove')
	.set('X-Forwarded-For', ip)
	.then(function() {});
}

function addViewer() {
    var ip = '192.168.0.'+Math.floor(Math.random()*254);
    console.log('Created viewer with IP', ip);
    request.get('/api/ipaddress/add')
	.set('X-Forwarded-For', ip)
	.then(function() {
	    setTimeout(function() {
		removeViewer(ip);
	    }, Math.random()*20000);
	});
}

function randomInit() {
    addViewer();
    setTimeout(randomInit, Math.random()*20000);
}
Array.apply(null, {length: 10}).map(function() { randomInit(); });

