'use strict';

angular.module('buzzzerApp', [
  'ui.router',
  'buzzzerApp.player',
  'buzzzerApp.referee',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
