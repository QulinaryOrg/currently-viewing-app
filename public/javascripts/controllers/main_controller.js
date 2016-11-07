angular.module('taroApp').controller('mainController', 
	["$rootScope", "$scope", "socket", "userProfile", 
	function($rootScope, $scope, socket, userProfile){

		var isAuth = userProfile.$isAuthenticated();
		var socIntance = socket.isInitialized()

		if((isAuth && !socIntance) || (socIntance && !socIntance.connected) ){
			socket.connect();
		}

		if(socket.isInitialized()){

			socket.on('init', function (data) {
				console.log(data);
				$scope.ips = data.ips;
			});

			socket.on('ip:added', function (data) {
				console.log(data);
				$scope.ips[data.ip] = true;
			});

			// add a message to the conversation when a user disconnects or leaves the room
			socket.on('ip:removed', function (data) {
				console.log(data);
				delete $scope.ips[data.ip]
			});

			socket.emit('hello');
		}
	}
]);