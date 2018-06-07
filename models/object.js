const database = require('../setup/database');

module.exports.save = (object, done) => {
  const dbName = process.env.NODE_ENV;
  const couch = database.connect();

  couch.uniqid().then((ids) => {
    object._id = ids[0];
    couch.insert(dbName, object).then(result => {
      console.log(result.data);
      return done(null, result.data);
    }, err => {
      return done(err);
    });
  }, err => {
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
    const doc = {};
    if (resultDoc) {
      doc.key = resultDoc.key,
      doc.value = resultDoc.value
      return done(null, doc);
    }

    const error = {
      code:'NODOCFOUND',
      body: {
        'error':'document_not_found',
        'reason':'Unable to get key'
      }
    };
    return done(error);
  }, err => {
    return done(err);
  });
};