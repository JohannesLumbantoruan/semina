const express = require('express');

const controller = require('./controller');

const router = express.Router();


router.get('/', controller.get);
router.post('/', controller.post);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;