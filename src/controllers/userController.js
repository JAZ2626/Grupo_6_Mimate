const express = require('express');
const { validationResult } = require('express-validator');


const controller = {
register:  (req, res)=>{
    res.render('register')
},

login: (req, res)=>{
    let errors = validationResult(req);
    if (errors.isEmpty()){
        let user = req.body;
        userId = usersModel.create(user);
        res.redirect('/' + userId)
    }else{
        return res.render('login', {errors: errors.mapped(),
            old: req.body});
    }
},

productCart: (req, res)=>{
    res.render('productCart')
}

}

module.exports = controller;


