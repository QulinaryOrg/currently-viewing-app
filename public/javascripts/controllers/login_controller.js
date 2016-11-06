angular.module('taroApp').controller('loginController', 
	["$scope", "Auth", "socket", "userProfile", "$state",
	function($scope, Auth, socket, userProfile, $state){
		
		$scope.user = {username: '', password: ''};
		$scope.error_message = '';
		console.log($scope.user)
		$scope.login = function(){
			Auth.signIn($scope.user).success(function(data){
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