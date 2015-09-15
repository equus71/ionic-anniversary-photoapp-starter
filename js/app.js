(function() {
  'use strict';

  var $stateProviderRef;

  angular.module('anniversary-photo-app', ['ionic', 'anniversary-photo-app.services', 'anniversary-photo-app.controllers'])

  .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
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
    .config(function($stateProvider) {
      $stateProviderRef = $stateProvider;
    })
    .run(['$urlRouter', 'appDataService',
      function($urlRouter, appDataService) {
        appDataService.getAppData()
          .then(function(data) {
            angular.forEach(data.galleries, function(value, key) {
              var state = {
                url: value.url || "/" + value.name,
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

            var startState = {
              url: '/start',
              parent: "app",
              abstract: false,
              views: {
                content: {
                  controller: data.startPage.controller || "StartPageCtrl",
                  templateUrl: data.startPage.template || "templates/start.html"
                }
              }
            };

            $stateProviderRef.state('app.start', startState);
            $urlRouter.sync();
            $urlRouter.listen();
          });
      }
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/menu.html",
          controller: 'AppCtrl as vm',
          resolve: {
            appData: ['appDataService',
              function(appDataService) {
                return appDataService.getAppData();
              }
            ]
          }
        });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/start');
    });

})();
