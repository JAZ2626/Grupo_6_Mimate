const express = require('express');

const productList = [
    { productName: "Masajes corporales",
      price: 4500,
    //   img: "../img/4.png",
      detail: " Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    { productName: "Cremas",
      price: 8000,
    //   img: "../img/8.png",
      detail: " Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    { productName: "Labial",
      price: 3000,
    //   img: "../img/13.png",
      detail: " Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    { productName: "Limpieza facial",
      price: 4000,
    //   img: "../img/1.png",
      detail: " Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
]

const controller = {

    productDetail: (req, res) => {
        const id = req.params.id-1
        const productI = productList[id];
        res.render('productDetail', {
            nombre: productI.productName,
            precio: productI.price,
            // imagen: productI.img,
            detalle: productI.detail
        });
    },
    // productId: (req, res) => {
    //     res.render('productDetail', )
    // },
    
    addProduct: (req, res) => {
        res.render('addProduct')
    },
    editProduct: (req, res) => {
        res.render('editProduct')
    },



}
module.exports = controller;


