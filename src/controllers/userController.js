const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

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
        //   let errors = validationResult(req);
        //     if (errors.isEmpty()){
        //         let user = req.body;
        //         userId = usersModel.create(user);
        //         res.redirect('/')
        //     }else{
        //         return res.render('login', {errors: errors.mapped(),
        //             old: req.body});
        //     }
        res.redirect('/');
    },
    productCart: (req, res) => {
        res.render('index')
    },
}



module.exports = controller;