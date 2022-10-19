const express = require('express');
const controller = require('../controllers/userController');
const multer = require('multer');
const bcrypt = require ('bcryptjs');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/imgUsers'));
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/register', controller.register);

router.post('/register', upload.single('image'), controller.addUser);

router.get('/login', controller.login);

router.get('/productCart', controller.productCart);


module.exports = router;
