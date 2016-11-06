angular.module('taroApp').controller('registerController', 
	["$scope", "Auth", "socket", "userProfile", "$state",
	function($scope, Auth, socket, userProfile, $state){
		$scope.user = {username: '', password: ''};
		$scope.error_message = '';

		$scope.register = function(){
			Auth.register($scope.user).success(function(data){
				if(data.state == 'success'){
					return userProfile.$refresh();
				}
				else{
					$scope.error_message = data.message;
				}
			}).then(function () {
		      	// UserProfile is refreshed, redirect user somewhere
		      	$state.go("home");
		    });
		};
	}
]);