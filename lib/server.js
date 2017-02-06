'use strict';

var express = require('express'),
    morgan = require('morgan'),
    app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

app.use(express.static('public'));

app.get("/", function(request, response) {
  response.end("Hello world!");
});

app.get('/:name', function(request, response) {
  response.end('Hello, ' + request.params.name + '!');
});

app.post('/:name', function(request, response) {
  response.end('POSTED: Hello, ' + request.params.name + '!');
})

// allow other modules to use the server
module.exports = app;
