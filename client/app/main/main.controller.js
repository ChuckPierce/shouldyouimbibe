'use strict';

angular.module('beermeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $window, $location) {
    $scope.awesomeThings = [];

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.user = Auth.getCurrentUser();

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    // $scope.beerFav = function() {
    //   var favs = [];
    //   angular.forEach($scope.user.beers, function(beer) {
    //     if(beer.rating >= 4.5) {
    //       favs.push(beer);
    //     }
    //   });
    //   var ranIndex = Math.floor(Math.random()*(favs.length-1));
    //   console.log(ranIndex);
    //   console.log(favs[ranIndex]);
    // };

    $scope.getMood = function() {
      $http.post('/api/users/getMood', $scope.user.tweets).success(function(moodNum) {
        console.log(moodNum);
      });
    };

  });
