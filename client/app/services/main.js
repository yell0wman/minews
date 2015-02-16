angular.module('miNewsApp').
        factory('GetFeeds', ['$http', function ($http) {

                'use strict';
                return {
                    get: function (sourse, googleApiSuffix, callback) {
                        $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/' + googleApiSuffix, {params: {'v': '1.0', 'q': sourse, 'alt': 'json-in-script', 'callback': 'JSON_CALLBACK'}})
                                .success(function (data) {
                                    callback(data);
                                })
                                .error(function (data) {
                                    console.log('ERROR: ' + data);
                                });
                    }
                };
            }]);
