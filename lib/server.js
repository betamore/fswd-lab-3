'use strict';

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./development.db');

db.each("SELECT * from tasks", function(err, row) {
    console.log(row);
});

var models = require('../models');

var tasks = ['Groceries', 'Take the dog out', 'Something else'];
// Create the express application object
var app = express();

app.set('view engine', 'pug');

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    // Setup the loggin format, depending on running environment
    app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(request, response, next) {
    response.locals.year = 2020;
    response.locals.season = 'Summer';
    next();
});

// Add the static middleware, pointed at the ./public directory
// app.use(express.static('public'));

app.get('/', function(request, response) {
    response.render('index');
});

app.post('/', function(request, response) {
    response.redirect('/' + request.body.name);
});

app.get('/tasks', function(request, response) {
    models.Task.findAll().then(function(tasks) {
        response.render('tasks', { tasks: tasks });
    });
});

app.post('/tasks', function(request, response) {
    models.Task.create(request.body)
        .then(function(task) {
            response.redirect('/tasks');
        });
});

app.get('/tasks/:id', function(request, response) {
    models.Task.findById(request.params.id).then(function(task) {
        response.send(task.name);
    });
    // db.get("SELECT * from tasks where id = " + request.params.id, function(err, row) {
    //     response.send(row.name);
    // });
    // if (tasks[request.params.id]) {
    //     response.send(tasks[request.params.id]);
    // } else {
    //     response.sendStatus(404);
    // }
});

app.get('/:name', function(request, response) {
    // response.send('Hi, ' + request.params.name + '!');
    response.render('name', { name: request.params.name });
});

// allow other modules to use the server
module.exports = app;
