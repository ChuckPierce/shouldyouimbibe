'use strict';

angular.module('beermeApp')
  .controller('OrderCtrl', function ($scope, $http, $rootScope, $location, $window, $state) {
  	var client;
  	$http.post('/api/orders/getToken', {}).success(function(token) {
  		braintree.setup(token, "custom", {id: "checkout"});
		client = new braintree.api.Client({clientToken: token});
    console.log(client);
  	}).error(function(err) {
  		console.log(err);
  	});

  	$scope.creditCard = {
      number: '',
      expirationDate: '',
      cvv: ''
    };

    $scope.order = {};


  	$scope.submitToDrizly = function($event) {
          console.log($scope.product);
  		client.tokenizeCard({number: $scope.creditCard.number, expirationDate: $scope.creditCard.expirationDate, cvv: $scope.creditCard.cvv}, function (err, nonce) {
  			$scope.order.payment_method_nonce = nonce;
        $scope.order.items = {};
        $scope.order.items[$scope.product.object_id] = 1;
        $scope.order.delivery_location = {latitude: localStorage.lat, longitude: localStorage.lon};
        $scope.order.customer.birth_date = new Date('10/06/1987');
        $scope.order.customer.billing_zip = $scope.order.billing_zip;
        delete $scope.order.billing_address;
        console.log($scope.order);
        $http.post('/api/orders/postToDrizly', $scope.order).success(function(response) {
          console.log(response);
          // $state.go('complete');
        });
		});
          // $rootScope.mood = undefined;
          // $rootScope.form = 'off';

          // setTimeout(function() {
          //   $window.location.reload();
          // }, 3000);
  	};

  });