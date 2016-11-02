define(['config', "Py", "angularAMD"], function (app, Py, angularAMD) {
    app.run([
        '$rootScope', '$log',
        function($scope, $log) {
            $scope.$safeApply = function(scope) {
                if(!scope)
                    scope = $scope;

                if(!scope.$$phase) {
                    scope.$apply();
                }
                return scope;
            }

            window.$safeApply = $scope.$safeApply;
        }
    ]);

    app.directive('warning', function() {
        return {
            restrict: "E",
            transclude: true,
            scope: {
                actions: '=actions',
            },
            templateUrl: "/views/alert-warning.html"
        };
    });

    return angularAMD.bootstrap(app);
})
