'use strict';

angular.module('beermeApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $window, $location, $rootScope) {
    $scope.awesomeThings = [];

    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.user = Auth.getCurrentUser();

    $rootScope.form;
    $rootScope.mood;

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.position = position;
        localStorage.lat = position.coords.latitude;
        localStorage.lon = position.coords.longitude;
      });
    });
  }

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
        if(moodNum.score >= 0.5) {
          $rootScope.mood = "You're super happy!  Have some champagne!!!"
          searchProduct('champagne');
        } else if(moodNum.score < 0.5 && moodNum.score > 0.2) {
          $rootScope.mood = "You have a nice outlook on life.  Have some nice whiskey";
          searchProduct('whiskey');
        } else if(moodNum.score <= 0.2 && moodNum.score >= -0.2) {
          $rootScope.mood = "You're neither sad nor happy.  Have a bud, bud";
          searchProduct('budweiser');
        } else if(moodNum.score > -0.5 && moodNum.score < -0.2) {
          $rootScope.mood = "You are a little sad. Have this bottle of vodka to cheer you up.";
          searchProduct('vodka');
        } else if(moodNum.score <= -0.5) {
          $rootScope.mood = "You are super sad.  You probably shouldn't have alcohol";
          $scope.product = {
              name: 'Water',
              image_url: 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Water_pour_2_(59785756).jpg/400px-Water_pour_2_(59785756).jpg'
          };
        }
        console.log($scope.mood);
      });
    };

  var searchProduct = function(searchTerm) {
    var query = {
      lat: localStorage.lat,
      lon: localStorage.lon,
      searchTerm: searchTerm
    };
    $http.post('/api/orders/productFind', query).success(function(products) {
            var productsParsed = JSON.parse(products);
            console.log(productsParsed);
            var ranNum = Math.floor(Math.random()*productsParsed.results.length);
            $scope.product = productsParsed.results[ranNum]
            console.log($scope.product);
            if(query.searchTerm === 'budweiser') {
              $scope.product.image_url = 'http://d2xcq73ooavf75.cloudfront.net/di_42358.jpg';
            }
          });
  };

  $scope.showForm = function() {
    $rootScope.form = true;
  };

  });
