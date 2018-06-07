const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const app = require('../app');
const request = require('request');

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

describe('API tests', () => {

  const indexBody = {
    'version-control-store': 'welcome',
    'version': '1.0.0'
  };

  const object1 = {
    'key': 'mykey',
    'value': 'value1',
    'timestamp': '1440568800'
  };

  const object2 = {
    'key': 'mykey',
    'value': 'value2',
    'timestamp': '1440569100'
  };

  const responseObject1 = {
    'key': 'mykey',
    'value': 'value1'
  };

  const responseObject2 = {
    'key': 'mykey',
    'value': 'value2',
  };


  it('should should show app welcome info', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(indexBody);
        done();
      });
  });

  it('should /POST mykey at 6pm', (done) => {
    chai.request(app)
      .post('/object/' + object1.key)
      .send(object1)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql(object1);
        done();
      });
  });

  it('should /GET latest mykey after posting at 6pm', (done) => {
    chai.request(app)
      .get('/object/' + object1.key)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(responseObject1);
        done();
      });
  });

  it('should /GET latest mykey at 6pm', (done) => {
    chai.request(app)
      .get('/object/' + object1.key)
      .query({timestamp: object1.timestamp})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(responseObject1);
        done();
      });
  });

  it('should /POST mykey at 6:05pm', (done) => {
    chai.request(app)
      .post('/object/' + object2.key)
      .send(object2)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql(object2);
        done();
      });
  });

  it('should /GET latest mykey at 6.05pm', (done) => {
    chai.request(app)
      .get('/object/' + object2.key)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(responseObject2);
        done();
      });
  });


  it('should /GET latest mykey at 6.03pm', (done) => {
    chai.request(app)
      .get('/object/' + object2.key)
      .query({timestamp: '1440568980'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(responseObject1);
        done();
      });
  });

});