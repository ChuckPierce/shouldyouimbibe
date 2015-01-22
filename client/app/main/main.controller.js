'use strict';

angular.module('beermeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $window, $location) {
    $scope.awesomeThings = [];

    $scope.isLoggedIn = Auth.isLoggedIn;

    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      // $http.get('https://api.untappd.com/v4/user/beers?access_token='+$scope.user.accessToken).success(function(beers) {
      //   $scope.beers = beers;
    // });
    });

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.beerFav = function() {

    };

    $scope.beerLike = function() {

    };

    $scope.beerDiff = function() {

    };

  });
