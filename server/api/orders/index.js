'use strict';

var express = require('express');
var controller = require('./orders.controller');

var router = express.Router();

router.get('/createDrizlyToken', controller.createDrizlyToken);
router.post('/productFind', controller.productFind);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/postToDrizly', controller.postToDrizly);
router.post('/getToken', controller.createToken);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;