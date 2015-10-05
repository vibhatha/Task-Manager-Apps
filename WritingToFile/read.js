var fs = require('fs');
var path = require("path");

var p = "files/tasklist/"
console.log("************************************")
console.log("This is a programme to read files");
console.log("************************************")

var readAllFiles = function(){
	
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
	
};
//reading a file
var readFile = function(filename){
	
	fs.readFile(p+filename,'utf8', function (err, data) {
		  if (err) throw err;
		  console.log('Read File Starting...')
		  //console.log(data);
		  
		  console.log('Read File Ending...')
		  processData(data);
		});
	
};


//processing data in the file

var processData = function(content){
	console.log("#######################################");
	console.log("Processing Data :");
	var data = content;
	var dataset0 = data.split("\n");
	//var dataset1 = dataset0.split("##")
	
	//console.log("Before remove length: "+dataset0.length);

	for(var i=1;i<dataset0.length;i++){
		if(dataset0[i]=='\r'){
			dataset0.splice(i, 1);
		}
		if(dataset0[i]==''){
			dataset0.splice(i, 1);
		}
		
		
	}
	//console.log("After remove length: "+dataset0.length);
	for(var j=1;j<dataset0.length;j++){
		
		//console.log(j+"-"+dataset0[j]);
		var d1 = dataset0[j].split('@@');
		//console.log(d1[1])
		var d2 = d1[1].split('##')
		//console.log(d2[0])
		var d3 = d2[0].split('{');
		var d4 = d3[1].split('}');
		
		//console.log(d4[0]);
		var d5 = d4[0].split(',');
		//console.log(d5.length);
		//this d5 contains one data stream and data has to be retrieved from the json object
		var d7=[];
		for(var k=0;k<d5.length;k++){
			
			//console.log(d5[k]);
			
			var d6 = d5[k].split('-')[1];
			d7.push(d6);
			//console.log(d6);
		}
		createJob(d7);
		
		//console.log(j+"). "+d2);
	}
	
	
	console.log("#######################################");
};

var createJob = function(job){
	console.log("#######################################");
	console.log("Job Creation Start")
	//0-name
	//1-timer ->start
	//2-endtime
	//3-job
	//4-action
	//5-device
	//6-smartplug
	for(var i=0;i<job.length;i++){
		console.log(job[i])
	}
	console.log("Job Creation End")
	console.log("#######################################");
};


//readAllFiles();
var current_filename = "tasklist.txt"
readFile(current_filename);



