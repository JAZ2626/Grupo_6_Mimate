const express = require('express');
const path = require('path');

const controller = {
register:  (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/users/register.html"))
},

login: (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/users/login.html"))
},

productCart: (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/users/productCart.html"))
}

}

module.exports = controller;


