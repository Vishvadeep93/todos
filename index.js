var express= require("express"); 
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var url = require("url");
var app=express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
mongoose.connect("mongodb://localhost/todosapp");
 var listSchema = mongoose.Schema({
  		task: String,
		status: Boolean,
});

var task_list= mongoose.model('to_Do_List',listSchema);


app.post('/addTask',function(req,res){
	//console.log(req.body);
	var data=req.body;
var newTask = new task_list({
		task: data.task_text,
		status: data.status,
	});
newTask.save(function(err){ 
if(err){
		res.send(err);
	}else{
res.send("{\"status\":\"done\"}")
}
});

})



app.get('/getTask',function(req,res){

task_list.find(function(err,result){
	if(err){
		res.send(err);
	}else{
    	
    	res.send(result);
    }

});});

app.delete('/deleteTask',function(req,res){
var query = url.parse(req.url, true).query;
//console.log(query.id);

task_list.remove({_id:query.id},function(err,result){
		if(err){
			res.send(err);
		}
		else{
			
			res.send("{\"status\":\"done\"}")
	
		}

})

});
app.post('/updateTask',function(req,res){
	var data=req.body;
	//console.log(req.body);


	task_list.update({_id:data.id},{status:data.status},function(err, doc){
		if(err) {
			res.send(err)
		}
		else
			{
				//console.log(doc);
		res.send("{\"status\":\"done\"}")
	}
	});
})
app.listen(3000);



