const express = require('express');

const upload = require('../../../middlewares/multer');

const controller = require('./controller');

const router = express.Router();

router.post('/', upload.single('avatar'), controller.post);

module.exports = router;