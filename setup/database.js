const NodeCouchDb = require('node-couchdb');

const database = {
  'dev' : {
    'protocol': process.env.DEV_DB_PROTOCOL || 'http',
    'host': process.env.DEV_DB_HOST || '127.0.0.1',
    'port': process.env.DEV_DB_PORT || '5984',
    'username': process.env.DEV_DB_USERNAME || 'admin',
    'password': process.env.DEV_DB_PASSWORD || 'password'
  },
 'test' : {
    'protocol': process.env.TEST_DB_PROTOCOL || 'http',
    'host': process.env.TEST_DB_HOST || '127.0.0.1',
    'port': process.env.TEST_DB_PORT || '5984',
    'username': process.env.TEST_DB_USERNAME || 'admin',
    'password': process.env.TEST_DB_PASSWORD || 'password'
  },
  'version_control_store' : {
    'protocol': process.env.DB_PROTOCOL,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD
  },
  connect (name) {
    const dbMetaData = database[name || process.env.NODE_ENV];
    const couch = new NodeCouchDb({
        host: dbMetaData.host,
        protocol: dbMetaData.protocol,
        port: dbMetaData.port,
        auth: {
            user: dbMetaData.username,
            pass: dbMetaData.password
        }
      });
    return couch;
  }
};

module.exports =  database;