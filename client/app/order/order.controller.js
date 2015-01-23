'use strict';

angular.module('beermeApp')
  .controller('OrderCtrl', function ($scope, $http) {

  	$http.post('/api/orders', {}).success(function(order) {
  		$scope.order = order
  		console.log(order);
  		braintree.setup($scope.order.clientToken, "custom", {
  			id: "checkout"
		});
  	}).error(function(err) {
  		console.log(err);
  	});

  	$scope.submitToDrizly = function() {

  	};

  });