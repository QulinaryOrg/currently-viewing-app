app = angular.module('taroApp', ['ui.router', 'ngCookies']).run(function($rootScope, $state, Access) {
	$rootScope.authenticated = false;

  	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
  		console.log("routeChangeStart");
		console.log(error);
		if (error == Access.UNAUTHORIZED) {
			$state.go("login");
		} else if (error == Access.FORBIDDEN) {
			$state.go("forbidden");
		}
	});

});












