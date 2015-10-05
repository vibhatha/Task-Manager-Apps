var fs = require('fs');
var path = require("path");
var Agenda = require("Agenda");
var agenda = new Agenda({db: { address: 'localhost:27017/mean-development-3'}});
var time1 ='at 10:11:14pm';
var time_slots =['at 06:34:10pm','at 06:34:20pm','at 06:34:30pm','at 06:34:40pm','at 06:34:50pm'];
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
	
	agenda.schedule(time_slots[i], task_list[i], {time: new Date(),job:task_list[i],timer:time_slots[i]});
	
}

for(var i=0;i<task_list.length;i++){
	
agenda.on('complete:'+task_list[i], function(job) {
	  console.log("Job : %s finished", job.attrs.name);
	  
	  fs.appendFile("files/"+"demo-"+job.attrs.name+".txt", "\n@@"+" {name:"+job.attrs.name+",timer:"+job.attrs.data.timer+",job:"+job.attrs.data.job+"}"+"##\n", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
	  
	});
	
}

var i=0;
agenda.define('readFiles', function(job, done) {
  console.log(new Date(), 'Reading File '+i);
  
  //code to read files from directory
  var p = "files/"
fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
        console.log("%s (%s)", file, path.extname(file));
		
		fs.readFile(file,'utf8', function (err, data) {
		  if (err) throw err;
		  console.log('Read File Starting...')
		  console.log(data);
		  console.log('Read File Ending...')
		});
		
    });
});
  
  
  
  //
  done();
});
i++;
agenda.schedule(new Date((new Date()).getTime()+10000), 'readFiles', {time: new Date()});

agenda.every('10 seconds', 'readFiles');



agenda.start();

console.log('Wait...');
console.log(new Date());

