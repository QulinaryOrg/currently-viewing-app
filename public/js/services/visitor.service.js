angular.module('VisitorService', []).factory('visitorService', ['$http', function ($http) {

    return {
        getAll: function () {
            return $http.get('/api/visitors');
        }
    };
}]);