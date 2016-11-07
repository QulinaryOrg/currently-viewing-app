angular.module('taroApp').controller('mainController', 
	["$rootScope", "$scope", "socket", "userProfile", 
	function($rootScope, $scope, socket, userProfile){

		$scope.posts = [];
		$scope.newPost = { created_by:userProfile.name, text:""};

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
				$scope.ips[data.ip] = data.username;
			});

			socket.on('ip:removed', function (data) {
				console.log(data);
				delete $scope.ips[data.ip]
			});

			socket.on('new:post', function (data) {
				console.log(data);
				$scope.posts.unshift(data);
			});

		}

		$scope.post = function() {
			socket.emit('new:post', $scope.newPost);
			$scope.posts.unshift($scope.newPost);
			$scope.newPost = { created_by:userProfile.name, text:""};
		};
	}
]);