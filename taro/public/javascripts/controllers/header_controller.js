angular.module('taroApp').controller('headerController', 
	[ "$scope", "$state", "Auth", "userProfile", "socket",
	function($scope, $state, Auth, userProfile, socket){
		$scope.authenticated = userProfile.$isAuthenticated();
		$scope.name = userProfile.name;
		
		$scope.signout = function(){
			if(socket.isInitialized()){
				socket.disconnect();
			}
			Auth.signout().then(function (response) {
				console.log("Signed out successfuly...");
				return userProfile.$refresh();
		    }).then(function (response) {
		      	$state.go("login");
		    });
	  	};
	}
]);