const database = require('../setup/database');
const moment = require('moment')


module.exports.save = (object) => {
  const couch = database.connect();
  return 'not yet implemented';
};

module.exports.findOne = (object, done) => {
  const couch = database.connect(process.env.NODE_ENV);
  const dbName = process.env.NODE_ENV;
  const mangoQuery = {
    'selector': {
      'timestamp' : {
        '$lte': object.timestamp
      },
      'key': object.key
    },
    'sort': [{'timestamp': 'desc'}]
  };
  const params = {};

  couch.mango(dbName, mangoQuery, params).then((result) => {
      // 6pm: 1440568800
  // 603pm: 1440568980
  // 605pm: 1440569100
  const resultDoc = result.data.docs[0];
  const doc = {};
  if (resultDoc) {
    doc.key = resultDoc.key,
    doc.value = resultDoc.value
  }

  return done(null, doc);
  }, err => {
    return done(err);
  });
};