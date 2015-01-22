'use strict';

angular.module('beermeApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $http.get('https://api.untappd.com/v4/user/beers/chuckpierce?client_id=36470790E0B3A4B397A99FC76D2A3725C476A96E&client_secret=CEF1DD251FD03481ED8675CCD560E4277C2E36A0').success(function(beers) {
      $scope.beers = beers;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
