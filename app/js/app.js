'use strict';

// Declare app level module which depends on views, and components
var flashcardApp = angular.module('flashcardApp', [
  'ngRoute',
  'flashcardControllers',
  'utils.autofocus'
])
flashcardApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'students/flashcards.html',
    controller: 'FlashcardCtrl'
  }).otherwise({redirectTo: '/'});
}]);

flashcardApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

angular.module('utils.autofocus', [])

.directive('autofocus', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link : function($scope, $element) {
      $timeout(function() {
        $element[0].focus();
      });
    }
  }
}]);
