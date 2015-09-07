(function () {
    'use strict';

    angular.module('anniversary-photo-app',
        ['ionic', 'anniversary-photo-app.services', 'anniversary-photo-app.controllers'])

        .config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
            $urlRouterProviderRef = $urlRouterProvider;

            //$locationProvider.html5Mode(false);
            $stateProviderRef = $stateProvider;

        })

        .run(['appDataService',
            function (appDataService) {
                appDataService.getAppData()
                    .then(function (data) {
                        angular.forEach(data.galleries, function (value, key) {
                            var state = {
                                url: value.url,
                                parent: "app",
                                abstract: value.abstract || false,
                                views: {
                                    content: {
                                        controller: value.controller || "BasicGalleryCtrl",
                                        templateUrl: value.template || "templates/basic.html"
                                    }
                                }
                            };

                            $stateProviderRef.state(value.name, state);
                        });
                        //$state.go("app.start");
                    });
            }])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "templates/menu.html",
                    controller: 'AppCtrl'
                })
                .state('app.start', {
                    url: "/start",
                    views: {
                        'content': {
                            templateUrl: "templates/start.html"
                        }
                    }
                });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/start');
        });

})();
