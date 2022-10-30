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


const validations = [
    body("Nombre").notEmpty().withMessage("Tenes que poner tu nombre"),
    body("Apellido").notEmpty().withMessage("Tenes que poner tu apellido"),
    body('Email').notEmpty().withMessage('Tenes que escribir un email').bail()
    .isEmail().withMessage("Formato de email inválido"),
    body("Telefono").notEmpty().withMessage("Tenes que poner tu telefono").bail()
    .isInt().withMessage("Tiene que ser un valor númerico"),
    body('Password').notEmpty().withMessage('Debes completar una contraseña válida')
    .trim().notEmpty().isLength({ min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'), 
    body('confirmPassword').notEmpty().withMessage('Debes completar la confirmacion de tu contraseña')
   .trim().custom((value, {req}) => {
         if (value !== req.body.Password) {
             throw new Error('Las contraseñas deben coincidir')
         }
         return true; 
     }),
    body("image").custom((value, { req })=> {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg','.png', '.gif'];
        if (!file) {
            throw new Error('Tenes que subir una imagen');
        } else{ 
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
           throw new Error('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')})');

        }
       
        }
        return true;
    })
];

router.get('/', controller.users);

router.get('/register', guestMiddleware, controller.register);

router.post('/register', upload.single('image'),  validations, controller.processRegister);

router.get('/detail/:id', controller.userDetail);

router.get('/login', [guestMiddleware, validationLog], controller.getLogin);

router.post('/login', /*authMiddleware.checkPassword,*/ controller.loginUser);

router.get('/productCart', controller.productCart);

router.get('/profile', loginAuthMiddleware, controller.profile);

router.get('/logout', controller.logout);

module.exports = router;
