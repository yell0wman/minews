angular.module('miNewsApp').
    factory('GetFeeds', ['$http', function($http){
        
       return {
           get: function(callback){
//                 $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/find", { params: { "v": "1.0", "q": "tsn.ua/rss", "alt": "json-in-script", "callback": "JSON_CALLBACK" } })
//                 $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/find", { params: { "v": "1.0", "q": "habrahabr.ru/rss/hubs/", "alt": "json-in-script", "callback": "JSON_CALLBACK" } })
                 $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "http://censor.net.ua/includes/news_ru.xml", "alt": "json-in-script", "callback": "JSON_CALLBACK" } })
            .success(function(data) {
              callback(data);
            })
            .error(function(data) {
                console.log("ERROR: " + data);
            });
           }
       };
    }]);
