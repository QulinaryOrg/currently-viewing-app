define(['app'], function (app) { 
    app.controller('IPAddressListCtrl', [
        '$scope', '$log',
        function ($scope, $log) {
            $scope.pageTitle	= 'Current Viewer IP Address List';
        }
    ]);
});
