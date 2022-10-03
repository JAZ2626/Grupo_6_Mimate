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
                category: findProduct.category,
                name: findProduct.name,
                image: findProduct.image,
                price: findProduct.price,
                description: findProduct.description,
                products: products,
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
        const id = req.params.id - 1
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        const products = JSON.parse(productsJSON);
        const productEdit = products.find(actualProduct => actualProduct.id-1 == id);

       res.render('editProduct', {productEdit: productEdit});
    },

    getProduct: (req, res) => {
        res.render('addProduct');
    },

    addProduct: (req, res) => { 
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        const products = JSON.parse(productsJSON);

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

    update:  (req, res) => {
        console.log(req.body)
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        const products = JSON.parse(productsJSON);
        const id = req.params.id;
        const editProduct = {
                id: id,
                name: req.body.name,
                description: req.body.description,
                image: '/img/' + req.file.filename,
                category: req.body.category,
                price: req.body.price,
            };

        editProduct.id = Number(editProduct.id);
        editProduct.price = Number(editProduct.price);
        const newListProducts = products.map( (productActual) => { 
            if(productActual == editProduct.id) {
                productActual = editProduct
            };
            return productActual
        });
        console.log(newListProducts)

        const newListProductsA = JSON.stringify(newListProducts);

        fs.writeFileSync(path.join(__dirname, "../data/products.json"), newListProductsA, "utf-8");
        
        if ( editProduct.category === 'product'){
            res.redirect('/products/products')
        }else{res.redirect('/products/services')};
        
        /*update: (req, res) => {
        const productId = Number(req.params.id);

		const newArrayProducts = products.map(oneProduct => {
			if (oneProduct.id === Number(req.params.id)) {
			return { 
				...oneProduct,
				...req.body,
				image: req.file ? req.file.filename : oneProduct.image
				}
			}
			return oneProduct;
		});
*/
    }, 

    delete: (req, res) => {
        const id = req.params.id;
        console.log(id)
        const productsJSON = fs.readFileSync(path.join(__dirname, "../data/products.json"), "utf-8");
        let products = JSON.parse(productsJSON);
        products = products.filter(productActual => productActual.id != id);

        const ListProducts = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, "../data/products.json"), ListProducts, "utf-8");
        
            res.redirect('/')

},
}
module.exports = controller;




