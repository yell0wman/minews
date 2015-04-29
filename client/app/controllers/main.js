angular.module('miNewsApp')
  .controller('MainCtrl', ['$scope', 'GetFeeds', '$http', function($scope, GetFeeds, $http) {
      
      'use strict';
      // TODO: For ukrainian and russian languages news need to be encoded
//      var sourses = ['censor.net.ua/includes/news_ru.xml', 'habrahabr.ru/rss/hubs/', 'tsn.ua/rss'];
      var sourses = ['travel.cnn.com/rss.xml', 'zdnet.com.feedsportal.com/c/35462/f/675716/index.rss', 'zdnet.com.feedsportal.com/c/35462/f/675684/index.rss'];
      var oneSiteFeeds = [];
      
      // Request callback
      var setFeeds = function(data) {
        if (data.responseData.entries) {
          data.responseData.entries.forEach(function (element, index, array) {
            oneSiteFeeds.push(element);
          });
        }
        else {
          data.responseData.feed.entries.forEach(function (element, index, array) {
            $http.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
            $http.post('/api/news', $.param({
              'title': element.title,
              'content_snippet': element.contentSnippet,
              'link': element.link,
              'author': element.author,
              'published_date': element.publishedDate
            }))
              .success(function (data, status, headers, config) {
                oneSiteFeeds.push(element);
                console.log(oneSiteFeeds);
              })
              .error(function (data, status, headers, config) {
                console.log('error');
                console.log(status);
              });

          });
        }
        
        // Delete all news from db (unstable - needs to rerun Grunt)
        // TODO: Create a "Remove all news" link for the admin user and put this code where it should be
//        $http.defaults.headers.delete = {'Content-Type': 'application/x-www-form-urlencoded'};
//        $http.delete('/api/news')
//          .success(function (data, status, headers, config) {
//            console.log('success');
//          })
//          .error(function (data, status, headers, config) {
//            console.log(data);
//            console.log(status);
//            console.log(headers);
//            console.log('error');
//          });
        
        $scope.feeds = shuffle(oneSiteFeeds);
      };
      
      // Mix array elements
      var shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      };
      
      // Set values for GetFeeds.get() parameters
      sourses.forEach(function(element, index, array) {
        var prefix = '';
        var googleApiSuffix = 'find';
        if (element.indexOf('.xml', -4)) {
          prefix = 'http://';
          googleApiSuffix = 'load';
        }
        
      // Get news by rss
      GetFeeds.get(prefix + element, googleApiSuffix, setFeeds);
        
      });
      
  }]);
  