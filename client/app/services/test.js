angular.module('miNewsApp').
    factory('DataSource', ['$http',function($http){
        
       return {
           get: function(callback){
                console.log('in get');
//                 $http.jsonp("http://ajax.googleapis.com/ajax/services/feed/load", { params: { "v": "1.0", "q": "tsn.ua/rss" } })
//                  $http.jsonp("https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&q=tsn.ua/rss")
//            .success(function(data) {
//              console.log(data);
//            })
//            .error(function(data) {
//                console.log("ERROR: " + data);
//            });
              function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}

var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=jsonp_callback";

$http.jsonp(url);
           }
       };
    }]);
  

