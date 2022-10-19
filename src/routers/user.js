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

router.get('/register', upload.single('image'), controller.register);

addUser: (req, res) => {
        const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
        const users = JSON.parse(usersJSON);

        const newUser = {
            id: users[users.length - 1].id + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            image: '/img/' + req.file.filename,
            email: req.body.email,
            password: req.body.password,
        };

        newUser.price = Number(newUser.price);
        users.push(newUser);

        const newListUsers = JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname, "../data/user.json"), newListUsers, "utf-8");

        res.redirect('/users')

    },

router.get('/login', controller.login);

router.get('/productCart', controller.productCart);


module.exports = router;
