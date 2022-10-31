const express = require('express');
const controller = require('../controllers/productsController');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const adminMiddleware = require('../middlewares/adminMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/imgProducts'));
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/productDetail/:id', controller.productDetail);

router.get('/products', controller.products);

router.get('/admin', adminMiddleware,  controller.admin);

router.get('/services', controller.services);

router.get('/edit/:id', adminMiddleware,  controller.editProduct);

router.put('/edit/:id', upload.single('image'),  controller.update);

router.delete('/edit/:id', controller.delete);

router.get('/addProduct', adminMiddleware, controller.getProduct);

router.post('/addProduct', upload.single('image'), controller.addProduct);




// router.get('/productCart', controller.productCart);


module.exports = router;