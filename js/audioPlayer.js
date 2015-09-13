(function() {
  'use strict';

  angular.module('anniversary-photo-app')

  .directive('audioPlayer', function($ionicPlatform, appDataService) {
    return {
      link: function(scope, elem, attrs) {
        var myMedia = null;
        $ionicPlatform.ready(function() {
          appDataService.getAppData().then(function(data) {
            initializeMusic(data.music);
          });
        });
        scope.$on('musicStop', pause);
        scope.$on('musicStart', play);
        scope.$on('$destroy', cleanUp);

        function initializeMusic(music) {
          if (music.enabled) {
            myMedia = new Media(music.path);
            myMedia.play();
          }
        }

        function pause() {
          if (myMedia) {
            myMedia.pause();
          }
        }

        function play() {
          if (myMedia) {
            myMedia.play();
          }
        }

        function cleanUp() {
          if (myMedia) {
            myMedia.release();
          }
        }
      }
    };
  });

})();
