var Agenda = require("Agenda");
var agenda = new Agenda({db: { address: 'localhost:27017/agenda-example'}});
var time1 ='at 10:11:14pm';



agenda.define('greet the world', function(job, done) {
  console.log(job.attrs.data.time, 'hello world!');
  done();
});

agenda.on('start', function(job) {
  console.log("Job : %s starting", job.attrs.name);
});

agenda.on('complete:greet the world', function(job) {
  console.log("Job : %s finished", job.attrs.name);
});

agenda.schedule('at 08:42:36am', 'greet the world', {time: new Date()});
agenda.start();

console.log('Wait...');
console.log(new Date());