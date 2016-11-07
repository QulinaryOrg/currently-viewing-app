angular.module('taroApp').config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
       
    $stateProvider
        
        .state("forbidden", {
            url: '/forbidden',
            resolve: {
                userProfile: "UserProfile"
            },
            views: {
                header: {
                    templateUrl: "partials/header.html",
                    controller: 'headerController'
                },
                content: {
                    templateUrl: "partials/forbidden.html"
                },
                footer: {
                    templateUrl: "partials/footer.html"
                }
            }
        })
        .state('home', {
            url: '/',
            resolve: {
                access: ["Access", function (Access) { return Access.isAuthenticated(); }],
                userProfile: "UserProfile"
            },
            views: {
                header: {
                    templateUrl: "partials/header.html",
                    controller: 'headerController'
                },
                content: {
                    templateUrl: "partials/main.html",
                    controller: 'mainController'
                },
                footer: {
                    templateUrl: "partials/footer.html"
                }
            }
        })
        
        .state('login', {
            url: '/login',
            resolve: {
                access: ["Access", function (Access) { return Access.isAnonymous(); }],
                userProfile: "UserProfile"
            },
            views: {
                header: {
                    templateUrl: "partials/header.html",
                    controller: 'headerController'
                },
                content: {
                    templateUrl: "partials/login.html",
                    controller: 'loginController'
                },
                footer: {
                    templateUrl: "partials/footer.html"
                }
            }
        })

        .state('register', {
            url: '/register',
            resolve: {
                access: ["Access", function (Access) { return Access.isAnonymous(); }],
                userProfile: "UserProfile"
            },
            views: {
                header: {
                    templateUrl: "partials/header.html",
                    controller: 'headerController'
                },
                content: {
                    templateUrl: "partials/register.html",
                    controller: 'registerController'
                },
                footer: {
                    templateUrl: "partials/footer.html"
                }
            }
        });
        
});