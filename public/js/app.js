'use strict';

angular.module('currentlyViewing', [
    'ngRoute',
    'VisitorService',
    'currentlyViewing.controllers'
]).
    // TO DO: If don't end up using Google Maps remove the code below.
    config(['$locationProvider', '$routeProvider', '$sceDelegateProvider',
        function ($locationProvider, $routeProvider, $sceDelegateProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.otherwise({ redirectTo: '/' });

            // Whitelist Google maps to allow embedding Google Maps iframes
            // See: http://stackoverflow.com/questions/20049261/sce-trustasresourceurl-globally/24841974#24841974
            $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://www.google.com/maps/embed/**'])

        }]);