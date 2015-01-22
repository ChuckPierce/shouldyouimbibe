'use strict';

angular.module('beermeApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.awesomeThings = [];

    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.user = user;
      // $http.get('https://api.untappd.com/v4/user/beers?access_token='+$scope.user.accessToken).success(function(beers) {
      //   $scope.beers = beers;
    // });
    });

  });
