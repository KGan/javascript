'use strict';

// Declare app level module which depends on views, and components
var flashcardApp = angular.module('flashcardApp', [
  'ngRoute',
  'flashcardControllers'
])
flashcardApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'students/flashcards.html',
    controller: 'FlashcardCtrl'
  }).otherwise({redirectTo: '/'});
}]);
