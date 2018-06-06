const express = require('express');
const bodyParser = require('body-parser');
const database = require('./setup/database.js');


const indexRouter = require('./routes/index.js');
const objectRouter = require('./routes/object.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', indexRouter);
app.use('/object', objectRouter);

const couch = database.connect();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App started. Listening on port', port));

module.exports = app;
module.exports = couch;