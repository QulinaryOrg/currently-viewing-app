angular.module('taroApp').controller('registerController', 
	["$scope", "Auth", "socket", "userProfile", "$state",
	function($scope, Auth, socket, userProfile, $state){
		$scope.user = {username: '', password: ''};
		$scope.error_message = '';

		$scope.register = function(){
			var state;
			Auth.register($scope.user).then(function(response){
				console.log(response);
				var data = response.data;
				state = data.state;
				if(state == 'success'){
					return userProfile.$refresh();
				}
				else{
					$scope.error_message = data.message;
				}
			}).then(function () {
		      	if(state == 'success'){
		      		$state.go("home");
		      	}
		    });
		};
	}
]);