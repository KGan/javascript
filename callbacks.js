'use strict';
function runpr() {

  function Clock() {
  }

  Clock.TICK = 5000;

  Clock.prototype = {
    printTime: function() {
      console.log( this.hours + ':' + this.minutes + ':' + this.seconds);
    },
    run: function() {
      var date = new Date();
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
      setInterval(this._tick.bind(this), Clock.TICK)
    },
    _tick: function() {
      this.seconds += 5;
      if (this.seconds > 60) {
        this.minutes += 1;
        this.seconds = this.seconds % 60;
        if (this.minutes > 60) {
          this.hours += 1;
          this.minutes = this.minutes % 60;
          if (this.hours > 23) {
            this.hours = 0;
          }
        }
      }
      this.printTime();

    }
  }

  var clock = new Clock();
  clock.run()
}


function summer() {
  var readline = require('readline');
  var reader = readline.createInterface(process.stdin, process.stdout, null);
  function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft > 0) {
      reader.question("Supply a number! ", function(input) {
        input = parseInt(input);
        sum += input;
        console.log(sum);
        addNumbers(sum, numsLeft - 1, completionCallback)
      })
    }
    if (numsLeft == 0) {
      completionCallback(sum);
      reader.close();
    }
  }

  addNumbers(0, 3, function (sum) {
    console.log("Total Sum: " + sum);
  });
}


function abs() {
  var readline = require('readline');
  var reader = readline.createInterface(process.stdin, process.stdout);

  function absurdBubbleSort(arr, sortCompletionCallback) {

    function outerBubbleSortLoop(madeAnySwaps) {
      if (madeAnySwaps == true) {
        innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop)
      }
      if (madeAnySwaps == false) {
        sortCompletionCallback(arr);
      }
    }
    outerBubbleSortLoop(true);
  }

  function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) {
      askIfGreaterThan(arr[i], arr[i+1], function(swap){
        if (swap) {
          var temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
        }
        innerBubbleSortLoop(arr, i+1, (swap || madeAnySwaps), outerBubbleSortLoop)
      })
    } else {
      if (i == arr.length - 1) {
        outerBubbleSortLoop(madeAnySwaps);
      }
    }
  }

  function askIfGreaterThan(el1, el2, callback) {
    reader.question("is " + el1 + ' greater than ' + el2 + '? k', function(input) {
      if (input === 'yes') {
        callback(true);
      } else {
        callback(false);
      }
    })
  }

  absurdBubbleSort([3,2,1], function(arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
  });
}

abs();
