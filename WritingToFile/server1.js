//reading every 5 seconds
Agenda = require('agenda');

var agenda = new Agenda({db: {address: 'localhost:27017/agenda-timer-1'}});

var time_slots=['at 05:20:10pm','at 05:25:20pm','at 05:30:30pm','at 05:35:40pm','at 05:40:10pm','at 05:45:20pm','at 05:50:30pm','at 05:55:40pm'];

agenda.define('greet the world', function(job, done) {
  console.log(new Date(), 'hello world!');
  done();
});

agenda.schedule(new Date((new Date()).getTime()+1000), 'greet the world', {time: new Date()});

agenda.every('5 seconds', 'greet the world');




agenda.start();

console.log('Wait 10 seconds...');