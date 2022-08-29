const express = require('express');
const path = require('path');

const controller = {
register:  (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/register.html"))
},

login: (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/login.html"))
},

productCart: (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../views/productCart.html"))
}

}

module.exports = controller;


