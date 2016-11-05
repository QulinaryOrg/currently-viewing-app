'use strict';

/* Controllers */


function AppCtrl($scope, socket) {


  $scope.messages = [];

  // Socket listeners
  // ================

  socket.on('init', function (data) {
    $scope.name = data.ipObject.ip;
    $scope.ipObjectList = data.ipObjectList;
    $scope.ips = getIpsFromList($scope.ipObjectList);
  });

  socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });

  socket.on('user:join', function (data) {
    $scope.messages.push({
      text: '+ IP ' + data.ipObject.ip + ' has joined.'
    });
    $scope.ips.push(data.ipObject.ip);
  });

  // add a message to the conversation when a user disconnects or leaves the room
  socket.on('user:left', function (data) {
    $scope.messages.push({
      text: '+ IP ' + data.ipObject.ip + ' has left.'
    });
    var i, user;
    for (i = 0; i < $scope.ips.length; i++) {
      user = $scope.ips[i];
      if (user === data.ipObject.ip) {
        $scope.ips.splice(i, 1);
        break;
      }
    }
  });

  // Private helpers
  // ===============
  
  function getIpsFromList(ipObjectList){
    var ips = [];
    for (var i = 0; i < ipObjectList.length; i++) {
      ips.push(ipObjectList[i].ip);
    };
    return ips;
  }

  function getHistoryFromIp(ip, ipObjectList){
    var history = [];
    for (var i = 0; i < ipObjectList.length; i++) {
      if(ipObjectList[i].ip == ip){
        history = ipObjectList[i].history;
      }
    };
    return history;
  }

  $scope.showDetails = function(ip){
    console.log('---' + ip);
    $scope.history = getHistoryFromIp(ip, $scope.ipObjectList);
    console.log($scope.history);
  }

}
