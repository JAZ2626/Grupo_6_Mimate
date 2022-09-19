const express = require('express');
const fs = require('fs');
const path = require('path');


const controller = {

    productDetail: (req, res) => {
        const id = req.params.id - 1
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        const products = JSON.parse(productsJSON);
        const findProduct = products.find(actualProduct => actualProduct.id-1 == id);
    
            res.render('productDetail', {
                name: findProduct.name,
                image: findProduct.image,
                price: findProduct.price,
                description: findProduct.description,
            });


    },
    products: (req, res) => {
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        const products = JSON.parse(productsJSON);
            res.render('products', {products:products,
            });

    },
    services: (req, res) => {
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        const products = JSON.parse(productsJSON);
            res.render('servicios', {products:products,
            });

    },
    productDetailOriginal: (req, res) => {
        res.render('productDetailOriginal')
    },


    editProduct: (req, res) => {
        res.render('editProduct')
    },

    getProduct: (req, res) => {
        res.render("addProduct");
    },

    addProduct: (req, res) => {
        const productsData = req.file; 
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        const products = JSON.parse(productsJSON);

console.log(req);
        const newProduct = {
                id: products[products.length - 1].id + 1,
                name: req.body.name,
                description: req.body.description,
                image: '/img/' + req.file.filename,
                category: req.body.category,
                price: req.body.price,
            };

        // newProduct.id = products[products.length - 1].id + 1
        newProduct.price = Number(newProduct.price);
        products.push(newProduct);

        const newListProducts = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, "../data/products.json"), newListProducts, "utf-8");
        
        if (newProduct.category === 'product'){
            res.redirect('/products/products')
        }else{res.redirect('/products/services')};
        
        
    },
}
module.exports = controller;



    //     ///res.render("users")
    //     const productsJSON = JSON.stringify(productos);
    //     fs.writeFileSync(path.join(__dirname, "../data/products.json"), productsJSON, "utf-8");
    //     res.redirect("/products");
    // }



