angular.module('miNewsApp')
  .controller('MainCtrl', ['$scope', 'GetFeeds', function($scope, GetFeeds) {
      
      setFeeds = function(data) {
        if (data.responseData.entries) {
          $scope.feeds = data.responseData.entries;
        }
        else {
          $scope.feeds = data.responseData.feed.entries;
        }
      };
      
      GetFeeds.get(setFeeds);

  }]);
  