angular.module('socketFactory', []).factory('socketFactory',  ['$rootScope',function($rootScope){

  var socket = io.connect();
  
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    }
  };
	
}]);