angular.module('GeoipService', []).factory('geoipService', ['$http', function ($http) {

    return {
        ipToGeo: function (ip) {
            return $http.get('http://freegeoip.net/json/' + ip);
        }
    };
}]);