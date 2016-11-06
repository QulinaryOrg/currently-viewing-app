angular.module('taroApp').factory('socket', function ($rootScope, $cookies) {   
    var socket = undefined;
    return {
        isInitialized: function () {
            return socket
        },
        connect: function () {
            socket = io.connect('/');
            console.log("Connection established")
        },
        disconnect: function () {
            socket.disconnect();
            console.log("Trying to disconnect");
        },
        on: function (eventName, callback) {
            socket.on(eventName, function () {  
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});