'use strict';

var express = require('express');
var controller = require('./news.controller');

var router = express.Router();

router.get('/', controller.showAll);
router.get('/:id', controller.showById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/', controller.destroyAll);

module.exports = router;
