angular.module('VisitorService', []).factory('visitorService', ['$http', function ($http) {

    return {
        /* Not needed since socket.io is used instead.
        addVisitor: function () {
            return $http.post('/api/visitors/add', {});
        },
        deleteVisitor: function (visitorId) {
            return $http.post('/api/visitors/delete/' + visitorId, {});
        },
        */
        getAll: function () {
            return $http.get('/api/visitors');
        }
    };
}]);