const express = require('express');
const controller = require('..controllers/mainController');
const router = express.Router;

router.get('/', controller.main);

module.exports = router;