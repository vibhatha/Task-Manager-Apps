var Agenda = require("Agenda");
var agenda = new Agenda({db: { address: 'localhost:27017/mean-development-3'}});
var time1 ='at 10:11:14pm';
var time_slots =['at 10:29:10am','at 10:29:20am','at 10:29:30am','at 10:29:40am','at 10:29:50am'];
var task_list =['Job 1','Job 2','Job 3','Job 4','Job 5'];


for(var i=0; i< task_list.length;i++){
  
  agenda.define(task_list[i], function(job, done) {

  console.log(new Date(), 'Job '+i);
  done();
  
  });
	
}

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

for(var i=0; i< task_list.length;i++){
	
	agenda.schedule(time_slots[i], task_list[i], {time: new Date()});
	
}

for(var i=0;i<task_list.length;i++){
	
	agenda.on('complete:'+task_list[i], function(job) {
	  console.log("Job : %s finished", job.attrs.name);
	});
	
}

agenda.start();

console.log('Wait...');
console.log(new Date());
