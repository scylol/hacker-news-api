const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const should = chai.should();

const { app, runServer, closeServer } = require('../server');


chai.use(chaiHttp);

function seedData() {
  console.info('Seeding data');
}

describe('Hacker News API', function () {
  before(function () {
    return runServer();
  });

  beforeEach(function () {

  });

  afterEach(function () {

  });

  after(function () {
    return closeServer();
  });

  describe('Starter Test Suite', function () {
    it('should list the top 20 stories sorted in descending order by votes', function () {
      return chai.request(app)
        .get('/api/stories')
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(20);
          const expectedKeys = ['title', 'url', 'votes'];
          res.body.forEach(item => {
            item.should.be.a('object');
            item.should.include.keys(expectedKeys);
          })
        })
    });
    it('should list the top 20 stories sorted in descending order by votes', function () {
      return chai.request(app)
        .get('/api/stories')
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(20);
          const expectedKeys = ['title', 'url', 'votes'];
          res.body.forEach(item => {
            item.should.be.a('object');
            item.should.include.keys(expectedKeys);
          })
        })
    });
  });

});
