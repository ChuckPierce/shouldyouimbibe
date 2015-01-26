'use strict';

describe('Controller: CompleteCtrl', function () {

  // load the controller's module
  beforeEach(module('beermeApp'));

  var CompleteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompleteCtrl = $controller('CompleteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
