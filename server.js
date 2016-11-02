var express		= require('express');
var expressWs		= require('express-ws');

var server		= expressWs(express()).app;

server.ws('/', function (ws, req) {
    ws.on('message', function(msg) {
	ws.send();
    });
    ws.on('close', function() {
    });
});

var IPAddresses = {};
server.use( express.static('./public') );
server.use('/api', function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var payload = IPAddresses;

    console.log(req.pathname);
    switch (req.path) {
    case '/':
	payload = {"APIEndpoints": {
	    "/api/ipaddress/add": "Add the IP address of the requesting client to the list of IP Addresses.",
	    "/api/ipaddress/remove": "Remove the IP address of the requesting client to the list of IP Addresses.",
	}};
	break;
    case '/ipaddress/add':
	IPAddresses[ip] = true;
	break;
    case '/ipaddress/remove':
	delete IPAddresses[ip];
	break;
    default:
	payload = {"error": 404,
		   "message": "The requested API endpoint '"+req.path+"' does not exist."};
    }
    
    res.set('Content-Type', 'application/json');
    // If NOT Ajax, then make it readable
    if (req.get('x-requested-with') === undefined)
    	res.send( JSON.stringify(payload, null, 4) );
    else
    	res.send( JSON.stringify(payload) );
    
});
server.listen(8000);
