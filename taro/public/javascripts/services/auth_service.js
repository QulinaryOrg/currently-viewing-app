angular.module('taroApp').service("Auth", ["$http", function ($http) {

    this.getProfile = function () {
        return $http.get("api/auth");
    };

    this.signIn = function (credentials) {
        return $http.post("/auth/login", credentials);
    };

    this.register = function (credentials) {
        return $http.post("/auth/signup", credentials);
    };

    this.signout = function () {
        return $http.get("/auth/signout");
    };

}]);