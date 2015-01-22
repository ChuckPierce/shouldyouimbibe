'use strict';

describe('Controller: ChoiceCtrl', function () {

  // load the controller's module
  beforeEach(module('beermeApp'));

  var ChoiceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChoiceCtrl = $controller('ChoiceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
