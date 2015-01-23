'use strict';

angular.module('beermeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $window, $location) {
    $scope.awesomeThings = [];

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.user = Auth.getCurrentUser();

    // Auth.getCurrentUser().$promise.then(function(user) {
    //   $scope.user = user;
    //   // $http.get('https://api.untappd.com/v4/user/beers?access_token='+$scope.user.accessToken).success(function(beers) {
    //   //   $scope.beers = beers;
    // // });
    // });

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.beerFav = function() {
      var favs = [];
      angular.forEach($scope.user.beers, function(beer) {
        if(beer.rating >= 4.5) {
          favs.push(beer);
        }
      });
      var ranIndex = Math.floor(Math.random()*(favs.length-1));
      console.log(ranIndex);
      console.log(favs[ranIndex]);
    };

    $scope.beerLike = function() {

    };

    $scope.beerDiff = function() {

    };

  });
