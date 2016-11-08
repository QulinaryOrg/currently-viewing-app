module.exports = function(app) {

	var addresses = {};

	// Routes
	app.get('/', function(req, res) {
		res.render('index.html');
	});

	app.get('/user', function(req, res) {

		// If duplicate instance, send dupe flag back
		if (addresses.hasOwnProperty(req.ip)) {
			res.send({
				addresses: addresses,
        dupe: true
			});
		} else {
			addresses[req.ip] = 1;
			res.send({
        myIP: req.ip,
				addresses: addresses
			});
		}

		// Update room users
		req.app.io.emit('update', {
			addresses: addresses
		});

	});

	app.post('/user/delete', function(req, res) {

		// Only disconnect user after all other instances have been closed
		delete addresses[req.ip];

		// Update room users
		req.app.io.emit('update', {
			addresses: addresses
		});
	});

};
