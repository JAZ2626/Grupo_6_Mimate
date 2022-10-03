const express = require('express');
const controller = require('../controllers/userController');
const multer = require('multer');
const router = express.Router();

router.get('/register', upload.single('image'), controller.register);

router.get('/login', controller.login);

router.get('/productCart', controller.productCart);


module.exports = router;
