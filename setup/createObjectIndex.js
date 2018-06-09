const database = require('./database')[process.env.NODE_ENV];
const request = require('request');

const createIndexUrl = database.protocol + '://' + database.username + ':' +
  database.password + '@' + database.host + ':' + database.port + '/' +
  process.env.NODE_ENV + '/_index';

const indexBody = {
  'index': {
    'fields': [
     'timestamp'
    ]
  },
  'name': 'timestamp-index',
  'type': 'json'
};

request.post({
  headers: {'content-type' : 'application/json'},
  url: createIndexUrl,
  body: JSON.stringify(indexBody)
}, (err, response, body) => {
  console.log(body);
});