(function () {
    'use strict';

    angular.module('anniversary-photo-app.services', [])

        .factory('appDataService', appDataService);

    appDataService.$inject = ['$http', '$q'];

    function appDataService($http, $q) {
        var appData = null, appDataPromise = null;

        return {
            getAppData: getAppData
        };

        function getAppData() {
            return $q.when(appData || appDataPromise || loadAppData());
        }

        function loadAppData() {
            var deferred = $q.defer();
            appDataPromise = deferred.promise;
            $http.get('data/appData.json').success(function (data, status, headers, config) {
                appData = data;
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        }

    }

})();

