const object = require('../models/object');
const moment = require('moment');


module.exports.objectDetail = (req, res) => {
  let timestamp = req.query.timestamp;
  if (timestamp) {
    timestamp = moment.unix(timestamp);
    if (!timestamp.isValid()) {
      res.status(400).send('Bad request');
    }
  } else {
    timestamp = moment().toISOString();
  }

  const objectBody = {
    'key': req.params.key,
    'timestamp': timestamp
  };

  object.findOne(objectBody, (err, result) => {
    if (err) {
      if (err.code = 'NODOCFOUND') {
        return res.status(404).send(err);
      }
      return res.status(500).send(err);
    }
    return res.status(201).send(result);
  });
};

module.exports.objectPost = (req, res) => {
  const body = req.body;
  const keys = Object.keys(req.body);
  if (!keys.length || !keys[0].length) {
    return res.status(400).send('Bad request');
  }

  if (!body.key || !body.value){
    return res.status(400).send('Bad request');
  }

  let timestamp = body.timestamp;
  if (timestamp) {
    timestamp = moment.unix(timestamp);
    if(!timestamp.isValid()) {
      return res.status(400).send('Bad request');
    }
  } else {
    timestamp = moment().toISOString();
  }

  const objectBody = {
    key: body.key,
    value: body.value,
    timestamp: timestamp
  }

  object.save(objectBody, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.send(objectBody);
  });
};