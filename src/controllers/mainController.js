const express = require('express');
const fs = require('fs');
const path = require('path');

const controller = {
    
main: (req, res)=>{
    const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
    const products = JSON.parse(productsJSON);
        res.render('index', {products:products,
        });
},

}

module.exports = controller;


