const express = require ("express");
const path = require ('path');
const routerMain = require('./router/main');
const routerUser = require('./router/user');
const routerProducts = require('./router/products');
const app = express();


app.listen(3030, ()=>{
    console.log(" ");
})

app.use(express.static('public'));
app.use('/', routerMain);
app.use('/user', routerUser);
app.use('/products', routerProducts);
