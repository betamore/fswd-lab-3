'use strict';

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');


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
    response.render('tasks', { tasks: tasks });
});

app.get('/:name', function(request, response) {
    // response.send('Hi, ' + request.params.name + '!');
    response.render('name', { name: request.params.name });
});

// allow other modules to use the server
module.exports = app;
