const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.get('/', controller.main);

module.exports = router;