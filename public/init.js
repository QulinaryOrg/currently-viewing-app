requirejs.config({
    baseURL: "/",

    // Configure Module Paths.
    paths: {
	"angularAMD":		"angularjs/angularAMD.min",
	"angular":		"angularjs/1.4.8/angular.min",
	"angular-route":	"angularjs/1.4.8/angular-route.min",
	"angular-cookies":	"angularjs/1.4.8/angular-cookies.min",
	"angular-animate":	"angularjs/1.4.8/angular-animate.min",
	"angular-aria":		"angularjs/1.4.8/angular-aria.min",
	"angular-messages":	"angularjs/1.4.8/angular-messages.min",
	"angular-material":	"angularjs/material/1.0.0/angular-material.min",

	"app":		"js/app",
	"config":	"js/config",
	"controllers":	"controllers",
	"Py":		"pythonify/pythonify",
	"apilib":	"apilib/whinc-apilib",
	"jquery":	"jquery/jquery-2.2.0.min",
	"bootstrap":	"bootstrap/3.3.6/js/bootstrap.min",

	"/api":		location.origin+"/api",
    },

    // Configure non-module dependencies (mostly angular).
    shim: {
	"angularAMD":		["angular"],
	"angular-aria":		["angular"],
	'angular-route':	["angular"],
	"angular-cookies":	["angular"],
	"angular-animate":	["angular"],
	"angular-messages":	["angular"],
	"angular-material":	["angular"],
	"bootstrap":		["jquery"],
	"Py": {
	    init: function(Pythonify) {
		window.Py	= Pythonify;
	    },
	    exports: "Pythonify"
	},	
    },
    deps: ['app']
});
