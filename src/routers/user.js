const express = require('express');
const controller = require('../controllers/userController');
const multer = require('multer');
const router = express.Router();
const { body } = require('express-validator');
const path = require('path');
const authMiddleware = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/imgUsers'));
    },

    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

const validationLog = [
    body('email').notEmpty().withMessage('Debes completar el email').bail()
    .isEmail().withMessage('Debes escribir un email valido'),
    body('password').notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

router.get('/', controller.users);

const validations = [
    body("Nombre").notEmpty(),
    body("Apellido").notEmpty(),
    body("Email").notEmpty(),
    body("Telefono").notEmpty(),
    body("Password").notEmpty(),
    body("confirmPassword").notEmpty(),
]

router.get('/register', controller.register);

//router.post('/register', upload.single('image'), validations, controller.addUser);

router.post ('/register' , upload.single('image'), validations, controller.processRegister);

router.get('/login', controller.getLogin);

router.post('/login', authMiddleware.checkPassword, controller.loginUser);

router.get('/productCart', controller.productCart);


module.exports = router;
