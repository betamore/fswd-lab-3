'use strict';

// code to test
var server = require('../lib/server');

// libraries
var request = require('supertest');

describe('server', function() {
    it('should respond with "Hello world!" on /', function() {
        return request(server)
            .get('/')
            .expect(200, /Hello world!/);
    });

    ['David', 'John', 'Lee'].forEach(function(name) {
        it('should respond with "Hello, ' + name + '!" on /' + name, function() {
            var expectedRegex = new RegExp("Hello, " + name + "!");
            return request(server)
                .get('/' + name)
                .expect(200, expectedRegex);
        });
    });

    it('should handle lastname in the query parameters', function() {
        return request(server)
            .get('/David?lastname=Raynes')
            .expect(200, /Hello, David Raynes!/);
    });

    describe('inseam', function() {
        it('should handle the large inseam', function() {
            return request(server)
                .get('/David?inseam=36')
                .expect(/Hello, David!/)
                .expect(/Wow, you are SUPER tall!/);
        });

        it('should handle the small inseam', function() {
            return request(server)
                .get('/David?inseam=24')
                .expect(/Hello, David!/)
                .expect(/How is the weather down there\?/);
        });

        it('should handle the middle inseam', function() {
            return request(server)
                .get('/David?inseam=30')
                .expect(/Hello, David!/)
                .expect(/And I understand your inseam is 30 inches\./);
        })
    });

    describe('both query parameters', function() {
        it('should handle lastname and inseam', function() {
            return request(server)
                .get('/David?lastname=Raynes&inseam=36')
                .expect(/Hello, David Raynes!/)
                .expect(/Wow, you are SUPER tall!/);
        });
    });
});
