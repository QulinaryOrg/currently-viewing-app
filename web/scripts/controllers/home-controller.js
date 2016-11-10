(function(){
	var app = angular.module("CurrentlyViewingApp");

	app.controller("HomeController", ["$scope", "socket", function($scope, socket){
		$scope.connectedUsers = [];
		$scope.query = "";


		socket.on('Connected Viewer', function(data){
			$scope.$apply(function () {
				$scope.connectedUsers = data.viewers;
			});
		});

		socket.on('Disconnected Viewer', function(data){
			$scope.$apply(function () {
				$scope.connectedUsers = data.viewers;
			});
		});
	}]);
}());