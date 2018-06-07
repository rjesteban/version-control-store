const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');

router.get('/:key', objectController.objectDetail);

router.post('/', objectController.objectPost);

router.get('/', function(req, res, next) {
  res.send({});
});

module.exports = router;
