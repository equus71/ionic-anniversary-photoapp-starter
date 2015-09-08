(function() {
  'use strict';
  angular.module('anniversary-photo-app.controllers', ['anniversary-photo-app.services'])

  .controller('AppCtrl', AppCtrl)
    .controller('BasicGalleryCtrl', BasicGalleryCtrl)
    .controller('StartPageCtrl', StartPageCtrl);

  AppCtrl.$inject = ['$rootScope', 'appDataService'];

  function AppCtrl($rootScope, appDataService) {
    var vm = this;
    //play the song from start
    vm.musicPlaying = true;
    vm.toggleMusic = function() {
      if ($scope.musicPlaying) {
        $rootScope.$broadcast('musicStop');
        vm.musicPlaying = false;
      } else {
        $rootScope.$broadcast('musicStart');
        vm.musicPlaying = true;
      }
    };

    //add dynamic data to menu
    vm.music = {};
    appDataService.getAppData().then(function(data) {
      vm.galleries = data.galleries;
      vm.music = data.music;
    });
  }

  BasicGalleryCtrl.$inject = ["$scope", "$state", "appDataService"];

  function BasicGalleryCtrl($scope, $state, appDataService) {
    $scope.gallery = {};
    $scope.text = "";
    appDataService.getAppData().then(function(data) {
      $scope.gallery = _.find(data.galleries, function(gallery) {
        return gallery.name == $state.$current.name;
      });
      $scope.text = [$scope.gallery.images[0].text];
    });

    $scope.slideHasChanged = function(param) {
      $scope.text = [$scope.gallery.images[param].text];
    };
  }

  StartPageCtrl.$inject = ["$scope", "appDataService"];

  function StartPageCtrl($scope, appDataService) {
    appDataService.getAppData().then(function(data) {
      $scope.startPage = data.startPage;
    });
  }


})();
