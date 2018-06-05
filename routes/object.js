const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController.js');

router.get('/:key', objectController.objectDetail);

router.post('/:key', objectController.objectPost);

router.get('/', function(req, res, next) {
  res.send({});
});

module.exports = router;
