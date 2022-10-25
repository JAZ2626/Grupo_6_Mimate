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
        res.render('users', {users:users});
    }, 
    profile: (req, res) => {
            const id = req.params.id - 1
            const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
            const users = JSON.parse(usersJSON);
            const findUsers = users.find(actualUser => actualUser.id-1 == id);
            if (findUsers){res.render('profile', {
                users:findUsers})}
            else {
                 res.redirect("/user")
                };
            
    },

    register: (req, res) => {
        res.render('register');
    },
    processRegister: (req, res) => {
        return res.send(req.body);
    },
    addUser: (req, res) => {
        const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
        const users = JSON.parse(usersJSON);

        const newUser = {
            id: users[users.length - 1].id + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            image: '/imgUsers/' + req.file.filename,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            telefono: Number(req.body.telefono)


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
                return res.redirect('/userProfile')
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
        res.render('index')
    },

    profile: (req, res)=>{
        return res.render('userProfile', {
        user: req.session.userLogged
        });
        },
        
        logout: (req, res)=>{
         req.session.destroy();
        return res.redirect('/');
        }
        
}




module.exports = controller;