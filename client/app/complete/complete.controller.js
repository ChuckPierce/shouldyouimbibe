'use strict';

angular.module('beermeApp')
  .controller('CompleteCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $http.get('/api/orders').success(function(orders) {
    	$scope.order = orders[0];
    })
  });
