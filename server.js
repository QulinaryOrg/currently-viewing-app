var express		= require('express');
var expressWs		= require('express-ws');

var server		= expressWs(express()).app;
var IPAddresses		= {};
var WebSockets		= {};

function json(data, format) {
    return JSON.stringify(data, null, format?4:null);
}

var count = 0;
server.ws('/', function (ws, req) {
    var i = count++;
    ws.id = i;
    WebSockets[i] = ws;

    ws.send(json(IPAddresses));
    ws.on('close', function() {
	delete WebSockets[i];
    });
});

function broadcast(data) {
    for (var id in WebSockets)
	WebSockets[id].send(json(data));
}

server.use( express.static('./public') );
server.use('/api', function (req, res) {
    var payload;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    switch (req.path) {
    case '/':
	payload = {"APIEndpoints": {
	    "/api/ipaddress/list": "List the IP addresses of the viewing clients.",
	    "/api/ipaddress/add": "Add the IP address of the requesting client to the list of IP Addresses.",
	    "/api/ipaddress/remove": "Remove the IP address of the requesting client to the list of IP Addresses.",
	}};
	break;
    case '/ipaddress/list':
	payload = IPAddresses;
	break;
    case '/ipaddress/add':
	IPAddresses[ip] = true;
	payload = IPAddresses;
	broadcast(IPAddresses);
	break;
    case '/ipaddress/remove':
	delete IPAddresses[ip];
	payload = IPAddresses;
	broadcast(IPAddresses);
	break;
    default:
	payload = {"error": 404,
		   "message": "The requested API endpoint '"+req.path+"' does not exist."};
    }
    
    res.set('Content-Type', 'application/json');
    // If NOT Ajax, then make it readable (formatted)
    res.send(json(payload, req.get('x-requested-with')));
    
});

if (!module.parent) {
    server.listen(80);
    console.log('Server is up and listening on port 80');
}
else
    module.exports = server;
