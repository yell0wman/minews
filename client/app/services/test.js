angular.module('miNewsApp').
    factory('DataSource', ['$http',function($http){
        
       return {
           get: function(callback){
                console.log('in get');
//                 $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/find", { params: { "v": "1.0", "q": "tsn.ua/rss", "alt": "json-in-script", "callback": "JSON_CALLBACK" } })
//                 $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/find", { params: { "v": "1.0", "q": "censor.net.ua/includes/news_ru.xml", "alt": "json-in-script", "callback": "JSON_CALLBACK" } })
                 $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/find", { params: { "v": "1.0", "q": "habrahabr.ru/rss/hubs/", "alt": "json-in-script", "callback": "JSON_CALLBACK" } })
            .success(function(data) {
              console.log(data);
            })
            .error(function(data) {
                console.log("ERROR: " + data);
            });
           }
       };
    }]);
  

