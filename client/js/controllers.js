'use strict';

function AppCtrl($scope, $http, $window, socket) {

	$scope.users = [];
	$scope.dupe = false;

	// Serialize users into array to be parsed client-side.
	var serialize = function(object) {
		var serializedArray = [];
		for (var user in object) {
			serializedArray.push(user);
		}

		return serializedArray;
	};

	// Initial retrieve of current users.
	$http.get("/user")
		.success(function(response) {
			if (response.hasOwnProperty('dupe')) {
				$scope.dupe = true;
			}

			$scope.myIP = response.ip;
			$scope.users = serialize(response.addresses);
		});

	// Delete user from room upon instance disconnect.
	window.onbeforeunload = function(event) {
	  event.preventDefault();

		if ($scope.dupe === true) {
			return null;
		} else {
			$.ajax({
				url: "/user/delete",
				type: "POST",
				data: {},
				async: true,
				success:function(){
					return null;
				}
			});
		}

	};

	// Since OnBeforeUnload event does not work on some browsers, add OnUnload to cover the rest.
	window.onunload = function(event) {
		event.preventDefault();

		if ($scope.dupe === true) {
			return null;
		} else {
			$.ajax({
				url: "/user/delete",
				type: "POST",
				data: {},
				async: true,
				success:function(){
					return null;
				}
			});
		}

	};

	// Socket listener to update users in real-time.
	socket.on('update', function(data) {
		$scope.users = serialize(data.addresses);
	});

}
