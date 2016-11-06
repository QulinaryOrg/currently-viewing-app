angular.module('taroApp').controller('mainController', 
	["$rootScope", "$scope", "socket", "userProfile", 
	function($rootScope, $scope, socket, userProfile){

		var isAuth = userProfile.$isAuthenticated();

		if(isAuth && !socket.isInitialized()){
			socket.connect();
		}

		if(socket.isInitialized()){
			$scope.messages = [];

			socket.on('init', function (data) {
				console.log(data);
				$scope.ips = data.ips;
			});

			socket.on('send:message', function (message) {
				$scope.messages.push(message);
			});

			socket.on('ip:added', function (data) {
				console.log(data);
				$scope.messages.push({
					text: '+ IP ' + data.ip + ' has joined.'
				});
				$scope.ips[data.ip] = true;
			});

			// add a message to the conversation when a user disconnects or leaves the room
			socket.on('ip:removed', function (data) {
				console.log(data);
				$scope.messages.push({
					text: '+ IP ' + data.ip + ' has left.'
				});
				delete $scope.ips[data.ip]
			});

			socket.emit('hello');
		}
	}
]);

/*

$scope.posts = [];
		$scope.newPost = {created_by: '', text: '', created_at: ''};
		
		postService.getAll().success(function(data){
			$scope.posts = data;
		});

		$scope.post = function() {
			$scope.newPost.created_by = $rootScope.current_user_id;
			$scope.newPost.created_at = Date.now();

			postService.save($scope.newPost).success(function(data){
				//$scope.posts = postService.query();
				console.log(data);
				$scope.posts.push(data);
				$scope.newPost = {created_by: '', text: '', created_at: ''};
			});
		};


angular.module('taroApp').controller('msgController', function($scope, socket){
	$scope.messages = [];

	socket.on('init', function (data) {
		console.log(data);
		$scope.name = data.ipObject.ip;
		$scope.ipObjectList = data.ipObjectList;
		$scope.ips = utils.getIpsFromList($scope.ipObjectList);
	});

	socket.on('send:message', function (message) {
		$scope.messages.push(message);
	});

	socket.on('ip:added', function (data) {
		$scope.messages.push({
			text: '+ IP ' + data.ipObject.ip + ' has joined.'
		});
		$scope.ips.push(data.ipObject.ip);
	});

	// add a message to the conversation when a user disconnects or leaves the room
	socket.on('ip:removed', function (data) {
		$scope.messages.push({
			text: '+ IP ' + data.ipObject.ip + ' has left.'
		});
		var i, user;
		for (i = 0; i < $scope.ips.length; i++) {
			user = $scope.ips[i];
			if (user === data.ipObject.ip) {
				$scope.ips.splice(i, 1);
				break;
			}
		}
	});
});
*/
