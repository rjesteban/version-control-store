const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  //res.send({"version-control-store":"welcome", "version": "1.0.0"})
  return res.status(200).send({"version-control-store":"welcome", "version": "1.0.0"});
});

module.exports = router;
