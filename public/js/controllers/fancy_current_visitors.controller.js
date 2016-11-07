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

FancyCurrentVisitorsController.$inject = ['$q', 'visitorService', 'geoipService'];
function FancyCurrentVisitorsController($q, visitorService, geoipService) {
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
            angular.forEach(response.data, function(visitor) {
                vm.locationPromises.push(geoipService.ipToGeo(visitor.ip));
            });
            $q.all(vm.locationPromises).then(function(responsesArray){
                angular.forEach(responsesArray, function(response) {
                    vm.visitors.push(response.data);
                });
            });
        });
    }
} 