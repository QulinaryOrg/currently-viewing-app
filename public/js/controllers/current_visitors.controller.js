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

CurrentVisitorsController.$inject = ['visitorService'];
function CurrentVisitorsController(visitorService) {
    var vm = this;

    vm.visitors = [];
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
            vm.visitors = response.data;
        });
    }
} 