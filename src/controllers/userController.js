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

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);
console.log(req.file)
        if (resultValidation.errors.length > 0){
            res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        } 
         let userInDB = User.findByField('email', req.body.Email);

		if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}
        
        const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
        const users = JSON.parse(usersJSON);

        const newUser = {
            id: users[users.length - 1].id + 1,
            nombre: req.body.Nombre,
            apellido: req.body.Apellido,
            telefono: Number(req.body.Telefono),
            image: '/imgUsers/' + req.file.filename,
            email: req.body.Email,
            password: bcrypt.hashSync(req.body.Password, 10),
            category: "usuario"     
        };

        users.push(newUser);

        const newListUsers = JSON.stringify(users);

        fs.writeFileSync(path.join(__dirname, "../data/user.json"), newListUsers, "utf-8");

        res.redirect('/user/login')}

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

                if(req.body.recordar){
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