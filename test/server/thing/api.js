'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

describe('Querying NAICS by year', function() {
  
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/q')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with an array for year 2007', function(done) {
    request(app)
      .get('/api/q?year=2007')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should reject an invalid year', function(done) {
    request(app)
      .get('/api/q?year=2099')
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('code', 400);
        done();
      });
  });

});