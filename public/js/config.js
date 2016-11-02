define([
    'jquery', 'Py', 'angularAMD',
    'angular-route', 'angular-cookies',
    'angular-animate', 'angular-aria',
    'angular-material', 'bootstrap',
], function (jQuery, Py, angularAMD) {
    var app = angular.module("CurrentViewersApp", [
	'ngRoute', 'ngCookies', 'ngAnimate', 'ngAria', 'ngMaterial'
    ]);

    app.config([
	"$locationProvider", "$routeProvider", "$mdThemingProvider"
	, function($locationProvider, $routeProvider, $mdThemingProvider) {
            $locationProvider.html5Mode(false);

	    // Define virtual pages
            $routeProvider
		.when('/', angularAMD.route({
		    templateUrl: "views/iplist.html",
		    controller: "IPAddressListCtrl",
		    controllerUrl: "controllers/IPAddressList",
		}))
		.otherwise({
		    redirectTo: '/'
		});

	    // Add a 'black' theme
            $mdThemingProvider.definePalette('black', {
		'50': '000000',
		'100': '0F0F0F',
		'200': '101010',
		'300': '1F1F1F',
		'400': '222222',
		'500': '333333',
		'600': '444444',
		'700': '555555',
		'800': '666666',
		'900': '777777',
		'A100': 'FFFFFF',
		'A200': 'EEEEEE',
		'A400': 'DDDDDD',
		'A700': 'CCCCCC',
		'contrastDefaultColor': 'light',
		'contrastDarkColors': ['A100', 'A200', 'A400', 'A700'],
		'contrastLightColors': undefined
            });

	    // Set theme collection
            $mdThemingProvider.theme('default')
		.primaryPalette('red')
		.accentPalette('grey')
		.warnPalette('black');
	}
    ]);

    return app;
});
