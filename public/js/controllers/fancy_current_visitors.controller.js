'use strict';

angular.module('currentlyViewing.fancy_current_visitors', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/fancy', {
            templateUrl: '/templates/fancy_current_visitors.template.html',
            controller: 'FancyCurrentVisitorsController',
            controllerAs: 'fcvCtrl',
        });
    }])
    .controller('FancyCurrentVisitorsController', FancyCurrentVisitorsController);

FancyCurrentVisitorsController.$inject = ['$q', '$window', 'visitorService', 'geoipService', 'NgMap'];
function FancyCurrentVisitorsController($q, $window, visitorService, geoipService, NgMap) {
    var vm = this;

    vm.visitors = [];
    vm.locationPromises = [];
    vm.currentVisitor = null;

    activate();

    function activate() {
        loadVisitors();
        listenForNewUsers();
    }

    function listenForNewUsers() {
        var socket = io();
        socket.on('new_user_connected', function (msg) {
            console.log('time to reload! Got another user!');
            loadVisitors();
        });
        socket.on('user_left', function (msg) {
            console.log('time to reload! Lost a user!');
            loadVisitors();
        });
    }

    function loadVisitors() {
        return visitorService.getAll().then(function (response) {
            // Clear promises array before we start re-populating it.
            vm.locationPromises.length = 0;
            angular.forEach(response.data, function (visitor) {
                vm.locationPromises.push(geoipService.ipToGeo(visitor.ip));
            });
            $q.all(vm.locationPromises).then(function (responsesArray) {
                // Clear visitors array before we start re-populating it.
                vm.visitors.length = 0;
                angular.forEach(responsesArray, function (response) {
                    vm.visitors.push(response.data);
                });
                initMap();
            });
        });
    }

    function initMap() {
        NgMap.getMap().then(function (map) {
            console.log(map.getCenter());
            map.markers = [];
            console.log('markers', map.markers);

            angular.forEach(vm.visitors, function (visitor) {
                var marker = new google.maps.Marker({
                    position: { lat: visitor.latitude, lng: visitor.longitude },
                    map: map,
                    title: visitor.ip
                });
                map.markers.push(marker);
            });
            console.log('shapes', map.shapes);
        });
    }
} 