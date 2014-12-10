angular.module('miNewsApp')
  .controller('TestCtrl', function(DataSource) {
//  .controller('TestCtrl', function($scope, DataSource) {
      console.log('in controller');
      //This is the callback function
//      setData = function(data) {
//        console.log('in setData');
//          $scope.dataSet = data;
//      };

//      setData = 'qwerty';
//      console.log(DataSource.get(setData));
console.log(DataSource.get());
  });
  