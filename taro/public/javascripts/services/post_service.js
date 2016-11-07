angular.module('taroApp').service('postService', ["$http", function($http){
	var baseUrl = "/api/posts";
	return {
        getAll: function(){
            return $http.get(baseUrl);
        },
        save: function(data){
            return $http.post(baseUrl, data);
        }
    };
}]);