angular.module('taroApp').controller('headerController', 
	[ "$scope", "$state", "Auth", "userProfile", "socket",
	function($scope, $state, Auth, userProfile, socket){
		console.log(userProfile)
		$scope.authenticated = userProfile.$isAuthenticated();
		$scope.name = userProfile.name;
		console.log("Hey you I am header")
		console.log($scope.authenticated);

		$scope.signout = function(){
			if(socket.isInitialized()){
				socket.disconnect();
			}
			Auth.signout().then(function () {
				console.log("Signed out successfuly...")
		      	$state.go("home");
		    });
	  	};
	}
]);