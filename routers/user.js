const express = require('express');
const controller = require('..controllers/userController');
const router = express.Router;

router.get('/register', controller.register);

router.get('/login', controller.login);

router.get('/productCart', controller.productCart);


module.exports = router;
