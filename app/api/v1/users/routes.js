const express = require('express');

const controller = require('./controller');
const authenticate = require('../../../middlewares/authenticate');

const router = express.Router();

router.post('/', authenticate, controller.post);

module.exports = router;