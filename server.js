var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/test');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// define model
var Task = mongoose.model('Todo', {
  text: String,
  //done: false
});


// routes

// API
// get all tasks
app.get('/api/tasks', function(req, res) {
  //use mongoose to find all tasks in the database
  Task.find(function(err, tasks) {
    if (err) {
      console.error(err);
      res.send(err);
    }
    console.log('>>>>>> GET request to /api/tasks');
    res.json(tasks); // return all tasks in hson format

  });
});

app.post('/api/tasks', function(req, res) {
  // create a Task, information comes from AJAX request from Angular
  Task.create({
    text: req.body.text,
    done: false
  }, function(err, tasks) {
    if (err) {
      console.error(err);
      res.send(err);
    }
    // get and return all the tasks after you create another
    Task.find(function(err, tasks) {
      if (err) {
        console.error(err);
        res.send(err);
      }
      res.json(tasks);
    });
  });
});

// delete a Task
app.delete('/api/tasks/:task_id', function(req, res) {
  Task.remove({
    _id: req.params.task_id
  }, function(err, task){
    if (err) {
      console.error(err);
      res.send(err);
    }
    // get and return all the tasks after you create another
    Task.find(function(err, tasks) {
      if (err) {
        console.error(err);
        res.send(err);
      }
      res.json(tasks);
    });
  });
});

// application
app.get('*', function(req, res) {
  res.sendFile('./public/index.html'); // load the single view file
});

// listen
app.listen(1337);
console.log('App listening on port 1337');