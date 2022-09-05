const express = require('express');

const controller = {

    productDetail: (req, res) => {
        res.render('productDetail')
    },
    addProduct: (req, res) => {
        res.render('addProduct')
    },
    editProduct: (req, res) => {
        res.render('editProduct')
    },



}
module.exports = controller;


