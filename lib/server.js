'use strict';

var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var models = require('../models');

// Create the express application object
var app = express();

app.set('view engine', 'pug');

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    // Setup the loggin format, depending on running environment
    app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.use(function(request, response, next) {
    response.locals.year = 2020;
    response.locals.season = 'Summer';
    response.locals.lastTaskViewed = request.session.lastTaskViewed;
    response.locals.authenticated = request.session.user_id;
    next();
});

app.use(function(request, response, next) {
    if (request.session.user_id) {
        models.User.findById(request.session.user_id)   
            .then(function(user) {
                request.user = user;
                next();
            })
    } else {
        next();
    }
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
    models.Task.scope('complete').findAll()
        .then(function(completedTasks) {
            models.Task.scope('incomplete').findAll()
                .then(function(incompleteTasks) {
                    response.render('tasks', {
                        completedTasks: completedTasks,
                        incompleteTasks: incompleteTasks
                    });
                });
        });
});

app.get('/tasks/complete', function(request, response) {
    models.Task.scope('complete').findAll()
        .then(function(tasks) {
            response.render('tasks', { completedTasks: tasks });
        });
});

app.get('/tasks/incomplete', function(request, response) {
    models.Task.scope('incomplete').findAll()
        .then(function(tasks) {
            response.render('tasks', { incompleteTasks: tasks });
        });
});

app.post('/tasks', function(request, response) {
    var taskPromise = request.user ?
        request.user.createTask(request.body) :
        models.Task.create(request.body);
    taskPromise
        .then(function(/* task */) {
            response.redirect('/tasks');
        });
});

app.param('task_id', function(request, response, next, id) {
    models.Task.findById(id).then(function(task) {
        if (task) {
            request.task = task;            
            next();
        } else {
            response.status(404).send("Not here, stop trying");
        }
    });
});

app.get('/tasks/:task_id', function(request, response) {
    //response.cookie('lastTaskViewed', request.task.id);
    request.session.lastTaskViewed = request.task.id;
    request.session.save(function() {
        response.render('task', { task: request.task });
    })
});

app.post('/tasks/:task_id/complete', function(request, response) {
    request.task.markComplete()
        .then(function() {
            response.redirect('/tasks');
        });    
});

// app.get('/:name', function(request, response) {
//     // response.send('Hi, ' + request.params.name + '!');
//     response.render('name', { name: request.params.name });
// });

app.get('/users/login', function(request, response) {
    if (request.user) {
        response.redirect('/tasks');
    } else {
        response.render('users/login');
    }
});

app.post('/users/login', function(request, response) {
    models.User.findOne({ where: { username: request.body.username }})
        .then(function(user) {
            if (!user) {
                response.render('users/login', {
                    error: 'Username not found'
                });
            } else if (user.password === request.body.password) {
                request.session.user_id = user.id;
                request.session.save(function() {
                    response.redirect('/tasks');
                })
            } else {
                response.render('users/login', {
                    error: 'Password does not match',
                    username: request.body.username
                });
            }
        });
});

app.get('/users/register', function(request, response) {
    if (request.user) {
        response.redirect('/tasks');
    } else {
        response.render('users/register');
    }
});

app.post('/users/register', function(request, response) {
    if (request.body.password === request.body.password_confirm) {
        models.User.findOne({ 
            where: { username: request.body.username },
        }).then(function(user) {
            if (user) {
                response.render('users/register', { error: 'Username already exists'});
            } else {
                models.User.create({
                    username: request.body.username,
                    password: request.body.password
                }).then(function(newUser) {
                    request.session.user_id = newUser.id;
                    request.session.save(function() {
                        response.redirect('/tasks');
                    });
                });
            }
        });
    } else {
        response.render('users/register', { error: 'Passwords do not match' });
    }
});

app.get('/users/logout', function(request, response) {
    request.session.destroy(function() {
        response.redirect('/');
    });
});

app.get('/users/profile', function(request, response) {
    response.render('users/profile', { user: request.user });
});

app.post('/users/profile', function(request, response) {
    request.user.update({ email: request.body.email })
        .then(function(user) {
            response.render('users/profile', { user: user, message: "Email address updated"});
        })
        .catch(function(error) {
            response.render('users/profile', { user: request.user, error: error.errors[0] });
        })  
})
//app.get('/users/profile',function(request,response) {
   // request.user.updade({delete_task})
   // .then (function(user) {
   //     response.render(delete_task)
   // })
        
} )
app.post('/users/profile,'),function(request,response)
    request.user.update({delete_task}))
    .then(function.user ({delete_task
        response.render('delete_task', {user: user, message: "Are you sure you want to delete?"});
    }
        
 )
// allow other modules to use the server
module.exports = app;
