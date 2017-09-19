'use strict';

var express = require('express'),
    morgan = require('morgan');

// Create the express application object
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    // Setup the loggin format, depending on running environment
    app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

app.get('/', function(request, response) {
    response.render('index');
});

var bodyParser = require('body-parser');

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function(request, response) {
    response.redirect('/David')
});

app.get('/:name', function(request, response) {
    response.render('name', {
        name: request.params.name,
        lastName: request.query.lastName,
        inseam: request.query.inseam
    });
    // var greeting = 'Hello, ' + request.params.name;
    // if (request.query.lastName) {
    //     greeting = greeting + ' ' + request.query.lastName;
    // }
    //
    // greeting = greeting + '!';
    //
    // if (request.query.inseam) {
    //     if (request.query.inseam > 34) {
    //         greeting = greeting + ' Wow, you are tall!';
    //     } else if (request.query.inseam < 26) {
    //         greeting = greeting + ' How is the weather down there?'
    //     } else {
    //         greeting = greeting + ' And I understand your inseam is '
    //             + request.query.inseam + ' inches.';
    //     }
    // }
    // response.end(greeting);
});

app.get('/:name/:lastName', function(request, response) {
    response.end('Hello, ' + request.params.name + ' ' + request.params.lastName + '!');
});

// Add the static middleware, pointed at the ./public directory
app.use(express.static('public'));

// allow other modules to use the server
module.exports = app;
