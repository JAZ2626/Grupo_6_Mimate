const express = require('express');

const controller = {

productDetail:  (req, res)=>{
    res.render('productDetail')
},
addProduct:  (req, res)=>{
    res.render('addProduct')
},


}
module.exports = controller;


