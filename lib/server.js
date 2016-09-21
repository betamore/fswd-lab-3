'use strict';

var express = require('express'),
    app = express();

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get("/", function(request, response) {
  response.render('index');
});

app.get('/:name', function(request, response) {
  response.render('name', { name: request.params.name });
});

app.post('/:name', function(request, response) {
  response.end('POSTED: Hello, ' + request.params.name + '!');
})

// allow other modules to use the server
module.exports = app;
