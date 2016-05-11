'use strict';

var currentlyViewApp = angular.module('currentlyviewing', ['firebase'])
.value('fbURL', 'https://currently-viewing.firebaseio.com')
.controller('IPListCtrl', ['$firebaseArray', 'fbRef', 'IPListService', function ($firebaseArray, fbRef, IPListService) {
  var IPList = this;

  //Connected to Firebase and displays list of connected devices in the UI
  IPList.devices = $firebaseArray(fbRef.child('devices'));

  /* Retreives the users IP Address
   * Adds IP to Firebase devices list
   * and plans to handle the removal on leaving the page
  */
  IPListService.getIPAddress().then(function(ret) {
    var currentRef = IPList.devices.$add({ deviceType: IPListService.getDeviceType(), ipAddress: ret.data.ip}).then(function(ref) {
      ref.onDisconnect().remove();
    }, function(){
      console.log('Error Getting Reference To Newly Added Device');
    });
  }, function(data){
    console.log('Error Loading IP Address');
  });

}])
.service('fbRef', function(fbURL) {
  return new Firebase(fbURL);
})
.service('IPListService', ['$http', function ($http) {
  var self = this;

  //Gets the device's IP Address
  self.getIPAddress = function() {
    // https://www.ipify.org/
    return $http.get('https://api.ipify.org?format=json');
  };

  //Lets use know what kind of device this is
  self.getDeviceType = function() {
    var ua = navigator.userAgent;
    var checker = {
      iphone: ua.match(/(iPhone|iPod|iPad)/),
      blackberry: ua.match(/BlackBerry/),
      android: ua.match(/Android/)
    };

    if (checker.android || checker.iphone || checker.blackberry) {
      return 'Mobile';
    } else {
      return 'Desktop';
    }
  };

}]);
