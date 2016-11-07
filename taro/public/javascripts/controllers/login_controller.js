angular.module('taroApp').controller('loginController', 
	["$scope", "Auth", "socket", "userProfile", "$state",
	function($scope, Auth, socket, userProfile, $state){
		
		$scope.user = {username: '', password: ''};
		$scope.error_message = '';
		
		$scope.login = function(){
			var state;
			Auth.signIn($scope.user).then(function(response){
				console.log(response);
				var data = response.data;
				state = data.state;
				if(state == 'success'){
					console.log("Success called");
      				return userProfile.$refresh();
				}
				else{
					$scope.error_message = data.message;
				}
		    }).then(function () {
		    	console.log("calling then...")
		      	if(state == 'success'){
		      		$state.go("home");
		      	}
		    });
		};
	}
]);