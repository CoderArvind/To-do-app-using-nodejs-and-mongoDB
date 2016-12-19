var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://todouser:todo@ds139438.mlab.com:39438/todo');
          //make an account on mlab.com, then make a db and then configure the user and password. Use the dbUser and password in mongoose.connect

var todoSchema=new mongoose.Schema({
  todo: String
});

var Todo=mongoose.model('Todo',todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports=function(app) {

app.get('/todo',function(req,res) {
  Todo.find({},function(err, data) {
      if(err) throw err;
      res.render('todo',{item:data});
  });

});

app.post('/todo',urlencodedParser,function(req,res) {
  var newItem = Todo(req.body).save(function(err, data) {
    if(err) throw err;
    res.json(data);
  });
});

app.delete('/todo/:item',function(req,res) {
  Todo.find({todo:req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
    if(err) throw err;
    res.json(data);
  });
});
}
