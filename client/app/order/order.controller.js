'use strict';

angular.module('beermeApp')
  .controller('OrderCtrl', function ($scope, $http, $rootScope) {
  	var client;
  	$http.post('/api/orders/getToken', {}).success(function(token) {
  		braintree.setup(token, "custom", {id: "checkout"});
		client = new braintree.api.Client({clientToken: token});
  	}).error(function(err) {
  		console.log(err);
  	});

  	$scope.creditCard = {
      number: '',
      expirationDate: '',
      cvv: ''
    };

    $scope.order = {};

  	$scope.submitToDrizly = function() {
  		client.tokenizeCard({number: $scope.creditCard.number, expirationDate: $scope.creditCard.expirationDate, cvv: $scope.creditCard.cvv}, function (err, nonce) {
  			$scope.order.payment_method_nonce = nonce;
        $scope.order.item = {};
        $scope.order.item[$scope.product.id] = 1;
        $http.post('/api/orders/postToDrizly', $scope.order).success(function(response) {
          console.log(response);
        });
  			// console.log($scope.order);
		});
          $rootScope.mood = undefined;
          $rootScope.form = 'off';
  	};

  });