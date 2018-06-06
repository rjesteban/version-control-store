const express = require('express');
const bodyParser = require('body-parser');
const database = require('./setup/database');


const indexRouter = require('./routes/index');
const objectRouter = require('./routes/object');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', indexRouter);
app.use('/object', objectRouter);

const couch = database.connect();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App started. Listening on port', port));

module.exports.app = app;
module.exports.couch = couch;