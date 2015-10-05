var Agenda = require("Agenda");
var agenda = new Agenda({db: { address: 'localhost:27017/agenda-example'}});
var time1 ='at 08:41:59am';
agenda.every('1 minutes', 'delete old users');

agenda.define('delete old users', function(job, done) {
  console.log('Delete User')
});

 agenda.define('delete old users 1', function(job, done) {
  var data = job.attrs.data;
  
  done();
}); 



var job = agenda.create('delete old users 1', {count: 1});
job.save(function(err) {
  console.log("Job successfully Saved on time");
  
});

job.schedule(time1);
job.save();

agenda.on('success:delete old users 1', function(job) {
  console.log("Sent Email Successfully to: %s", job.attrs.name);
});

agenda.on('start', function(job) {
  console.log("Job : %s starting", job.attrs.name);
});

agenda.on('complete:delete old users 1', function(job) {
  console.log("Job : %s finished", job.attrs.name);
});

agenda.start();
