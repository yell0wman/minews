angular.module('miNewsApp')
  .controller('MainCtrl', ['$scope', 'GetFeeds', function($scope, GetFeeds) {
      
      'use strict';
      sourses = ['censor.net.ua/includes/news_ru.xml', 'habrahabr.ru/rss/hubs/', 'tsn.ua/rss'];
      oneSiteFeeds = [];
      
      // Request callback
      setFeeds = function(data) {
        if (data.responseData.entries) {
          data.responseData.entries.forEach(function(element, index, array) {
            oneSiteFeeds.push(element);
          });
        }
        else {
          data.responseData.feed.entries.forEach(function(element, index, array) {
            oneSiteFeeds.push(element);
          });
        }
          $scope.feeds = shuffle(oneSiteFeeds);
      };
      
      // Mix array elements
      shuffle = function(array) {
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
        if (element.indexOf('.xml', -4)) {
          prefix = 'http://';
          googleApiSuffix = 'load';
        } else {
          prefix = '';
          googleApiSuffix = 'find';
        }
        
      // Get news by rss
      GetFeeds.get(prefix + element, googleApiSuffix, setFeeds);
        
      });
      
  }]);
  