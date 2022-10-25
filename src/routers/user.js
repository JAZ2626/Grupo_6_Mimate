const express = require('express');
const controller = require('../controllers/userController');
const multer = require('multer');
const router = express.Router();
const { body } = require('express-validator');
const path = require('path');
const authMiddleware = require("../middlewares/authMiddleware");
const guestMiddleware = require('../middlewares/guestMiddleware');
const loginAuthMiddleware = require('../middlewares/loginAuthMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/imgUsers'));
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const validationLog = [
    body('email').notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes escribir un email valido'),
    body('password').notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

router.get('/', controller.users);

router.get('/register', guestMiddleware, controller.register);

//router.post('/register', upload.single('image'), controller.addUser);

router.get('/:id', controller.profile1);

router.get('/login', controller.getLogin);

router.post('/register', controller.processRegister);

router.get('/login', [guestMiddleware, validationLog], controller.getLogin);

router.post('/login', authMiddleware.checkPassword, controller.loginUser);

router.get('/productCart', controller.productCart);

router.get('/profile', loginAuthMiddleware, controller.profile);

router.get('/logout', controller.logout);

module.exports = router;
