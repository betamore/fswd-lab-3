'use strict';

var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
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

var models = require('../models');

app.use(cookieParser());
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
    var SequelizeStore = require('connect-session-sequelize')(session.Store);
    var sessionStore = new SequelizeStore({
        db: models.sequelize
    });
    sessionStore.sync();
    app.use(session({
        secret: 'Shhhhh!',
        store: sessionStore,
        saveUninitialized: true,
        resave: false
    }));
// } else {
//     var RedisStore = redis(session);
//     app.use(session({
//       secret: 'Shhhhh!',
//       resave: false,
//       saveUninitialized: true,
//       store: new RedisStore({ url: process.env.REDIS_URL })
//     }));
}

app.get('/', function(request, response) {
    response.render('index');
});

var bodyParser = require('body-parser');

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(request, response, next) {
    console.log(request.session);
    next();
});

app.post('/', function(request, response) {
    response.redirect('/David')
});

app.get('/tasks', function(request, response) {
    models.Task.findAll()
        .then(function(tasks) {
            response.render('tasks/tasks', { tasks: tasks, createError: request.query.createError });
        });
});

app.post('/tasks', function(request, response) {
    models.Task.create(request.body)
        .then(function(task) {
            response.redirect('/tasks/' + task.id);
        })
        .catch(function() {
            response.redirect('/tasks?createError=1');
        });
});

app.param('task_id', function(request, response, next, id) {
    models.Task.findById(id)
        .then(function(task) {
            if (task) {
                request.task = task;
                next();
            } else {
                response.sendStatus(404);
            }
        });
});

app.get('/tasks/:task_id', function(request, response) {
    request.session.lastTaskViewed = request.task.id;
    request.session.save(function() {
        response.format({
            html: function() {
                response.render('tasks/task', { task: request.task });
            },
            json: function() {
                response.json(request.task);
            }
        })
    });
});

app.post('/tasks/:task_id', function(request, response) {
    request.task.update(request.body)
        .then(function(task) {
            response.redirect('/tasks/' + task.id);
        });
});

// app.get('/:name', function(request, response) {
//     response.render('name', {
//         name: request.params.name,
//         lastName: request.query.lastName,
//         inseam: request.query.inseam
//     });
//     // var greeting = 'Hello, ' + request.params.name;
//     // if (request.query.lastName) {
//     //     greeting = greeting + ' ' + request.query.lastName;
//     // }
//     //
//     // greeting = greeting + '!';
//     //
//     // if (request.query.inseam) {
//     //     if (request.query.inseam > 34) {
//     //         greeting = greeting + ' Wow, you are tall!';
//     //     } else if (request.query.inseam < 26) {
//     //         greeting = greeting + ' How is the weather down there?'
//     //     } else {
//     //         greeting = greeting + ' And I understand your inseam is '
//     //             + request.query.inseam + ' inches.';
//     //     }
//     // }
//     // response.end(greeting);
// });
//
// app.get('/:name/:lastName', function(request, response) {
//     response.end('Hello, ' + request.params.name + ' ' + request.params.lastName + '!');
// });
//
// Add the static middleware, pointed at the ./public directory

app.get('/users/register', function(request, response) {
    response.render('users/register', { user: {} });
});

app.post('/users/register', function(request, response) {
    response.render('users/register', { user: request.body })
});

app.use(express.static('public'));

// allow other modules to use the server
module.exports = app;
