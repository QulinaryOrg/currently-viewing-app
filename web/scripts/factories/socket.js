(function(){
	var app = angular.module("CurrentlyViewingApp");

	app.factory('socket', [function() {
		var socket = io.connect();

		return {
			on: function(eventName, callback){
			  socket.on(eventName, callback);
			}
		};
	}]);
}());