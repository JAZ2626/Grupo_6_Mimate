const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../models/User')
const controller = {
    users: (req, res) => {
        const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
        const users = JSON.parse(usersJSON);
        res.render('users', { users: users });
    },
    userDetail: (req, res) => {
        const id = req.params.id - 1
        const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
        const users = JSON.parse(usersJSON);
        const findUsers = users.find(actualUser => actualUser.id - 1 == id);
        if (findUsers) {
            res.render('userDetail', {
                users: findUsers
            })
        }
        else {
            res.redirect("/user")
        };

    },

    register: (req, res) => {

        res.render('register');
    },
    /*processRegister:(req, res) =>{
        return res.send (req.body);
       const resultValidation = validationResult(req);
       return res.send(resultValidation);
    },*/
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
            return res.semd('Estas registrad@');
        };
        
        const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
        const users = JSON.parse(usersJSON);

        const newUser = {
            id: users[users.length - 1].id + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: Number(req.body.telefono),
            image: '/imgUsers/' + req.file.filename,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            category: "usuario"     
        };

        users.push(newUser);

        const newListUsers = JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname, "../data/user.json"), newListUsers, "utf-8");

        res.redirect('/')

    },
    getLogin: (req, res) => {
        res.render('login');
    },
    
    loginUser: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let okPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (okPassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin

                if(req.body.recodar){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 10})
                }

                return res.redirect('/user/profile')
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: "Las credenciones son invalidas"
                    }
                }
            });
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: "No se encuentra este email"
                }
            }
        });


        //   let errors = validationResult(req);
        //     if (errors.isEmpty()){
        //         let user = req.body;
        //         userId = usersModel.create(user);
        //         res.redirect('/')
        //     }else{
        //         return res.render('login', {errors: errors.mapped(),
        //             old: req.body});
        //     }
    },
    productCart: (req, res) => {
        res.render('productCart')
    },

    profile: (req, res) => {
        return res.render('userProfile', {
            users: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }

}




module.exports = controller;