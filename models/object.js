const NodeCouchDb = require('node-couchdb');
const database = require('../setup/database');

module.exports.save = (object) => {
  return "not yet implemented";
};

module.exports.retrieve = (object) => {
  console.log(database.connect("version_control_store"))
  return "not yet implemented";
};