const express = require ('express');
const path = require ('path');
const routerMain = require('./routers/main');
const routerUser = require('./routers/user');
const routerProducts = require('./routers/products');
const app = express();

app.set('view engine','ejs');
app.set("views", [
    path.join(__dirname, './views/users'),
    path.join(__dirname, './views/products'),
]);



app.listen(3030, ()=>{
    console.log(" ");
})

app.use(express.static('../public'));
app.use('/', routerMain);
app.use('/user', routerUser);
app.use('/products', routerProducts);

