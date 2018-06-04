const express = require('express');
const crypto = require('crypto');
const app = express();

app.get('/', (req, res) => {
  res.send({"version-control-store":"welcome", "version": "1.0.0"})
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App started. Listening on port', port));