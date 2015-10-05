var later = require('later');
console.log(new Date());
var sched = later.parse.recur().every(15).second(),
      t = later.setTimeout(test, sched);

  function test() {
    console.log(new Date());
  }