var CurrentlyViewingManager = function(){
	
	function getIP(socket){
		var ip = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
		
		if (ip.substr(0, 7) == "::ffff:") {
		  ip = ip.substr(7)
		}

		return ip;
	}


	this.start = function(server){
		var io 		= require('socket.io')(server);
		var clients = [];

		io.on('connection', function(socket) {
			var ip = getIP(socket);

			if(clients.indexOf(ip) == -1)
				clients.push(ip);

			socket.on('disconnect', function(){
				var index = clients.indexOf(ip);
		 
			    if (index > -1) {
			       clients.splice(index, 1);
			    }

				io.emit('Disconnected Viewer', {disconnected: ip, viewers: clients});
			});

			io.emit('Connected Viewer', {connected: ip, viewers: clients});
		});
	}
}




module.exports = new CurrentlyViewingManager();