(function() {
  'use strict';
  angular.module('anniversary-photo-app.controllers', ['anniversary-photo-app.services'])

  .controller('AppCtrl', AppCtrl)
    .controller('BasicGalleryCtrl', BasicGalleryCtrl)
    .controller('StartPageCtrl', StartPageCtrl);

  AppCtrl.$inject = ['$rootScope', 'appData'];

  function AppCtrl($rootScope, appData) {
    var vm = this;
    //play the song from start
    vm.musicPlaying = appData.music.autoplay || true;
    vm.toggleMusic = function() {
      if (vm.musicPlaying) {
        $rootScope.$broadcast('musicStop');
        vm.musicPlaying = false;
      } else {
        $rootScope.$broadcast('musicStart');
        vm.musicPlaying = true;
      }
    };

    //add dynamic data to menu
    vm.galleries = appData.galleries;
    vm.music = appData.music;
    vm.menu = appData.menu;
  }

  BasicGalleryCtrl.$inject = ["$scope", "$state", "appData"];

  function BasicGalleryCtrl($scope, $state, appData) {
    $scope.gallery = _.find(appData.galleries, function(gallery) {
      return gallery.name == $state.$current.name;
    });
    $scope.text = [$scope.gallery.images[0].text];

    $scope.slideHasChanged = function(param) {
      $scope.text = [$scope.gallery.images[param].text];
    };
  }

  StartPageCtrl.$inject = ["$scope", "appData"];

  function StartPageCtrl($scope, appData) {
    $scope.startPage = appData.startPage;
  }


})();
