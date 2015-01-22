'use strict';

angular.module('beermeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('choice', {
        url: '/choice',
        templateUrl: 'app/choice/choice.html',
        controller: 'ChoiceCtrl'
      });
  });