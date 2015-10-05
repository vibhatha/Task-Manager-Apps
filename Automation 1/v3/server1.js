var later = require('later');
  // will fire every 5 minutes
  var textSched = later.parse.text('at 4:45 pm');

  // execute logTime one time on the next occurrence of the text schedule
  var timer = later.setTimeout(logTime, textSched);

  // execute logTime for each successive occurrence of the text schedule
  var timer2 = later.setInterval(logTime, textSched);

  // function to execute
  function logTime() {
    console.log(new Date());
  }

  // clear the interval timer when you are done
  timer2.clear();