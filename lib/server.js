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

app.get('/:name', function(request, response) {
  response.render('name', { name: request.params.name });
});

app.post('/tasks', function(request, response) {
  response.end(request.body.todo);
})

// allow other modules to use the server
module.exports = app;
