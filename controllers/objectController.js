const object = require('../models/object');
const moment = require('moment');

module.exports.objectDetail = (req, res) => {
  let timestamp = req.query.timestamp;

  const objectBody = {
    'key': req.params.key,
    'timestamp': timestamp ? moment.unix(timestamp).toISOString():
      moment().toISOString()
  };

  console.clear();
  object.findOne(objectBody, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
};

module.exports.objectPost = (req, res) => {
  res.send('NOT implemented: Post object: ' + req.params.key);
};