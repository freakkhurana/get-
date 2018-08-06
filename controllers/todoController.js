var bodyParser = require('body-parser');
var mongoose = require('mongoose');



mongoose.connect('mongodb://test:testify123@ds113452.mlab.com:13452/todoapp');

var todoappSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoappSchema);



var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

	app.get('/todo', function(req,res){
		Todo.find({}, function(err,data){
			if (err) throw err;
			res.render('todo', {todos: data});
		});
		


	});

	app.post('/todo', urlencodedParser, function(req,res){

		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		})

	});

	app.delete('/todo/:item', function(req,res){

		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

}