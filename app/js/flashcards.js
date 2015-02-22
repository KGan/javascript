'use strict';

var flashcardControllers = angular.module('flashcardControllers', []);

flashcardControllers.controller('FlashcardCtrl', ['$scope', '$http',
  function($scope, $http) {

    $scope.init = function() {
      $http.get('students/students.json').success(function(data) {
        $scope.cohorts = data
        $scope.score = 0;
        $scope.current_index = - 1
        $scope.feedback_message = "";
        $scope.updateStudents();
        $scope.next()
      });

    }

    $scope.giveUp = function() {
      $scope.result_hidden = false;
      $scope.feedback_message = "Say hello to " + fullName($scope.current_student) + "!"
      $scope.next_button_focus = true;
      $scope.textbox_focus = false
    }

    $scope.updateStudents = function () {
      $scope.students = []
      for (var cohort in $scope.cohorts) {
        if ($scope.cohorts[cohort].selected) {
          $scope.students = $scope.students.concat($scope.cohorts[cohort].students)
        }
      }
      shuffleStudents()
    }

    $scope.nextOrSubmit = function() {
      if($scope.result_hidden) {
        $scope.submit()
      } else {
        $scope.next()
      }
    }

    $scope.submit = function() {
      if ($scope.result_hidden == false) {
        return
      }
      var poss_names = validNames($scope.current_student)
      var guess = $scope.guess.toLowerCase()
      if(guess == '') {
        $scope.score--;
        $scope.feedback_message = "You could have just given up. It's " + fullName($scope.current_student)
      } else if (poss_names.indexOf(guess) > - 1) {
        $scope.score++;
        $scope.feedback_message = "Yep, you're right, this is " + fullName($scope.current_student)
      } else if (edDist(guess, poss_names[0]) < 4 || (poss_names[1] && edDist(guess, poss_names[1])) ) {
        $scope.score += 0.5
        $scope.feedback_message = "Well, close. Actually it's " + fullName($scope.current_student)
      } else {
        $scope.score--;
        $scope.feedback_message = "Uhh... nope! It's " + fullName($scope.current_student)
      }
      $scope.result_hidden = false
      $scope.next_button_focus = true
      $scope.textbox_focus = false
    }


    function validNames(student) {
      var result = []
      result.push(student.name.split(" ")[0].toLowerCase())
      if (student.nickname) {
        result.push(student.nickname.toLowerCase())
      }
      return result
    }

    function fullName(student) {
      var nickname
      var name_array = student.name.split(" ")
      if (student.nickname) {
        nickname = ' "' + student.nickname + '" '
      } else {
        nickname = ' '
      }
      return name_array[0] + nickname + name_array[1]
    }

    function imagePath(student) {
      var name_arr = student.name.split(" ")
      var path = 'img/'
      for (var i = 0; i < name_arr.length; i++) {
        path += name_arr[i].toLowerCase()
        if (i == name_arr.length - 1) {
          path += '.jpg'
        } else {
          path += '-'
        }
      }
      return path
    }

    function shuffleStudents() {
      shuffle($scope.students)
    }

    $scope.next = function() {
      $scope.current_index++;
      $scope.result_hidden = true;
      if($scope.current_index == $scope.students.length) {
        shuffleStudents();
        $scope.current_index = 0;
      }
      $scope.current_student = $scope.students[$scope.current_index];
      $scope.student_image_path = imagePath($scope.current_student)
      $scope.guess = ''
      $scope.textbox_focus = true
      $scope.next_button_focus = false
    }

    // Cargo-culted code follows::

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }


    function edDist(a, b) {
      if(a.length === 0) return b.length;
      if(b.length === 0) return a.length;

      var matrix = [];

      // increment along the first column of each row
      var i;
      for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
      }

      // increment each column in the first row
      var j;
      for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
          if(b.charAt(i-1) == a.charAt(j-1)){
            matrix[i][j] = matrix[i-1][j-1];
          } else {
            matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                    Math.min(matrix[i][j-1] + 1, // insertion
                                             matrix[i-1][j] + 1)); // deletion
          }
        }
      }

      return matrix[b.length][a.length];
    };

  }]);
