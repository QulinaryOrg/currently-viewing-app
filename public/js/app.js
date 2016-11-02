define(['config', "Py", "angularAMD"], function (app, Py, angularAMD) {
    app.run([
        '$rootScope', '$log',
        function($scope, $log) {
            $scope.$safeApply = function(scope) {
		if (scope === undefined)
		    scope = $scope;
		return !scope.$$phase ? scope.$apply() && scope : scope;
            }
	    $scope.API = function(path, async) {
		return new Promise(function(f,r) {
		    $.ajax({
			url: path,
			async: async === false ? false : true,
			dataType: 'json',
		    }).then(function() {
			$scope.$safeApply();
			f.apply(this, arguments);
		    },r);
		});
	    }

            window.$safeApply = $scope.$safeApply;
        }
    ]);

    return angularAMD.bootstrap(app);
})
