'use strict';

angular.module('currentlyViewing.controllers', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/current_visitors.template.html',
            controller: 'CurrentVisitorsController',
            controllerAs: 'cvCtrl',
        });
    }])
    .controller('CurrentVisitorsController', CurrentVisitorsController);

CurrentVisitorsController.$inject = ['$scope', '$window', 'visitorService'];
function CurrentVisitorsController($scope, $window, visitorService) {
    var vm = this;

    vm.visitors = [];
    vm.currentVisitor = null;

    activate();

    function activate() {
        loadVisitors();
        // addAndLoadVisitors();
        listenForNewUsers();
    }
    
    /*
    // Event Handlers
    // Detect leaving this application
    window.onbeforeunload = function (e) {
        deleteCurrentVisitor();
    };

    // Detect change to another angular route
    $scope.$on('$locationChangeStart', function (event, next, current) {
        deleteCurrentVisitor();
        alert('locationChangeStart');
    });

    function addAndLoadVisitors() {
        addVisitor().then(function (response) {
            vm.currentVisitor = response.data;
            loadVisitors();
        });
    }

    function addVisitor() {
        return visitorService.addVisitor();
    }

    function deleteCurrentVisitor() {
        return visitorService.deleteVisitor(vm.currentVisitor._id);
    }*/

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
            vm.visitors = response.data;
        });
    }
} 