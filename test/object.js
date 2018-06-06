const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const app = require('../app').app;

chai.use(chaiHttp);

describe('API tests', () => {

  const indexBody = {
    "version-control-store": "welcome",
    "version": "1.0.0"
  };

  const object1 = {
    "key": "mykey",
    "value": "value1",
    "timestamp": "1440568800"
  };

  const object2 = {
    "key": "mykey",
    "value": "value2",
    "timestamp": "1440569100"
  };

  it('root show app welcome info', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(indexBody);
        done();
      });
  });

  it('/POST mykey at 6pm', (done) => {
    chai.request(app)
      .post('/' + object1.key)
      .send(object1)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql(object1);
        done();
      });
  });

  it('/GET latest mykey at 6pm', (done) => {
    chai.request(app)
      .get('/' + object1.key)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(object1);
      });
  });

  it('/POST mykey at 6:05pm', (done) => {
    chai.request(app)
      .post('/' + object2.key)
      .send(object2)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.eql(object2);
      });
  });

  it('/GET latest mykey at 6.05pm', (done) => {
    chai.request(app)
      .get('/' + object2.key)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(object2);
      });
  });


  it('/GET latest mykey at 6.03pm', (done) => {
    chai.request(app)
      .get('/' + object2.key)
      .query({timestamp: "1440568980"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(object1);
      });
  });
});