angular.module('mainCtrl', []).controller('mainController', ["$scope", "$http", 'socketFactory', function($scope, $http, socketFactory){

	socketFactory.on('connections', function(data){
		$scope.locations = data;
	})

}]);