'use strict';

angular.module('miNewsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'TestCtrl'
      });
  });