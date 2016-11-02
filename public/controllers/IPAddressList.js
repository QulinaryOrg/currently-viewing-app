define(['app'], function (app) { 
    app.controller('IPAddressListCtrl', [
        '$scope', '$log',
        function ($scope, $log) {
            $scope.pageTitle	= 'Current Viewer IP Address List';
	    $scope.addressList	= null;

	    // Add IP address to viewers
	    $scope.API('/api/ipaddress/add').then(function(list) {
		$scope.addressList = list;
	    });

	    if (window.WebSocket) {
		// WebSocket connection for instant updates
		var ws = new WebSocket('ws://'+location.host);
		ws.onopen = function() {
		    console.log('Websocket connection is open');
		}
		ws.onmessage = function(msg) {
		    $scope.addressList = JSON.parse(msg.data);
		    $safeApply();
		}
		ws.onclose = function() {
		    console.log('Websocket connection closed');
		}
	    }
	    else {
		// Ajax fallback if WebSockets is unavailable
		$scope.updateList = function() {
		    $scope.API('/api/ipaddress/list').then(function(list) {
			$scope.addressList = list;
		    });
		}
		setInterval($scope.updateList, 2000);
	    }

	    $(window).on('unload beforeunload', function() {
		// Remove IP address from viewers
		$scope.API('/api/ipaddress/remove', false).then(function(list) {
		    $scope.addressList = list;
		});
	    });
        }
    ]);
});
