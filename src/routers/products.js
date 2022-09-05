const express = require('express');
const controller = require('../controllers/productsController');
const router = express.Router();


router.get('/productDetail', controller.productDetail);

router.get('/addProduct', controller.addProduct);

router.get('/editProduct', controller.editProduct);

// router.get('/productCart', controller.productCart);


module.exports = router;