const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.post('/', controller.post);

module.exports = router;