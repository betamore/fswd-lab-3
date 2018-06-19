'use strict';

// code to test
var server = require('../lib/server');
var models = require('../models');

// libraries
var request = require('supertest').agent;

beforeAll(function() {
    return models.sequelize.sync({ force: true });
});

it('should have a test', function() {
    expect(true).toBe(true);
});

describe('login page', function() {
    it('should have a login page', function() {
        return request(server)
            .get('/users/login')
            .expect(200, /Login!/);
    });

    describe('when there is a user', function() {
        var user;
        beforeAll(function() {
            return models.User.create({ username: 'test-user', password: 'their-password '})
                .then(function(u) {
                    user = u;
                })
        });

        it('should allow the user to login', function() {
            return request(server)
                .post('/users/login')
                .type('form')
                .send({
                    username: user.username,
                    password: user.password
                })
                .expect(302)
                .expect('Location', '/tasks');
        });

        it('should warn the user that passwords do not match', function() {
            return request(server)
                .post('/users/login')
                .type('form')
                .send({
                    username: user.username,
                    password: 'SomethingElseEntirely'
                })
                .expect(200, /Password does not match/);
        });
    });
});

describe('registration page', function() {
    it.skip('should have a registration page', function() {
        return request(server)
            .get('/users/register')
            .expect(200, /Register!/);
    })
});

// describe('server', function() {
//     it('should respond with "Hello world!" on /', function() {
//         return request(server)
//             .get('/')
//             .expect(200, /Hello world!/);
//     });
//
//     ['David', 'John', 'Lee'].forEach(function(name) {
//         it('should respond with "Hello, ' + name + '!" on /' + name, function(done) {
//             request(server)
//                 .get('/' + name)
//                 .expect(200, 'Hello, ' + name + '!', done);
//         });
//     });
// });
