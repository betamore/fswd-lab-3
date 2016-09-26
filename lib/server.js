'use strict';

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get("/", function(request, response) {
  response.render('index');
});

// app.get('/:name', function(request, response) {
//   response.render('name', { name: request.params.name });
// });

var models = require('../models');

app.get('/tasks', function(request, response) {
  models.Task.findAll()
    .then(function(tasks) {
      response.render('tasks/tasks', { tasks: tasks });
    });
});

app.get('/tasks/:task_id', function(request, response) {
  models.Task.findById(request.params.task_id)
    .then(function(task) {
      response.render('tasks/task', { task: task });
    });
});

function redirectToTask(response, task) {
  response.redirect('/tasks/' + task.id);
}

app.post('/tasks/:task_id', function(request, response) {
  models.Task.findById(request.params.task_id)
    .then(function(task) {
      task.name = request.body.todo;
      return task.save();
    }).then(function (task) {
      redirectToTask(response, task);
    });
});

app.post('/tasks', function(request, response) {
  response.end(request.body.todo);
})

// allow other modules to use the server
module.exports = app;
