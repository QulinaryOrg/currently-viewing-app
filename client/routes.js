angular.module('routes', []).config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'mainController'
		})

		.otherwise( {
			redirectTo: '/'
		});
}]);