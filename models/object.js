const database = require('../setup/database');
const moment = require('moment')


module.exports.save = (object, done) => {
  const dbName = process.env.NODE_ENV;
  const couch = database.connect();

  const objectBody = {
    'key': object.key,
    'value': object.value,
    'timestamp': object.timestamp
  };

  couch.uniqid().then((ids) => {
    object._id = ids[0];
    couch.insert(dbName, object).then((result) => {
      return done(null, objectBody);
    }, (err) => {
      return done(err);
    });
  }, (err) => {
    return done(err);
  });

};

module.exports.findOne = (object, done) => {
  const dbName = process.env.NODE_ENV;
  const couch = database.connect();
  const mangoQuery = {
    'selector': {
      'timestamp' : {
        '$lte': object.timestamp
      },
      'key': object.key
    },
    'sort': [{'timestamp': 'desc'}],
    'limit': 1
  };
  const params = {};

  couch.mango(dbName, mangoQuery, params).then((result) => {
    const resultDoc = result.data.docs[0];
    if (resultDoc) {
      const doc = {
        'key': resultDoc.key,
        'value': resultDoc.value
      };
      return done(null, doc);
    }
    const error = {
      code:'NODOCFOUND',
      body: {
        'error': 'document_not_found',
        'reason': 'Unable to get key'
      }
    };
    return done(error);
  }, (err) => {
    return done(err);
  });
};