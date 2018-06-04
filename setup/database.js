var database = {
  "dev" : {
    "protocol": process.env.DEV_DB_PROTOCOL || "http",
    "host": process.env.DEV_DB_HOST || "127.0.0.1",
    "port": "5984",
    "username": process.env.DEV_DB_USERNAME || "admin",
    "password": process.env.DEV_DB_PASSWORD || "p@ssw0rd"
  },
 "test" : {
    "protocol": process.env.TEST_DB_PROTOCOL || "http",
    "host": process.env.TEST_DB_HOST || "127.0.0.1",
    "port": process.env.TEST_DB_PORT || "5984",
    "username": process.env.TEST_DB_USERNAME || "admin",
    "password": process.env.TEST_DB_PASSWORD || "p@ssw0rd"
  },
  "version_control_store" : {
    "protocol": process.env.DB_PROTOCOL,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD
  }
};

module.exports =  database;