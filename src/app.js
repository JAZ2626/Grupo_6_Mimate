const express = require ('express');
const path = require ('path');
const routerMain = require('./routers/main');
const routerUser = require('./routers/user');
const routerProducts = require('./routers/products');
const app = express();
const methodOverride = require('method-override');

app.set('view engine','ejs');

app.set("views", [
    path.join(__dirname, './views/users'),
    path.join(__dirname, './views/products'),
]);



app.listen(3030, ()=>{
    console.log(" ");
});


app.use(methodOverride('_method'));

app.use(express.static(__dirname, "../public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routerMain);
app.use('/user', routerUser);
app.use('/products', routerProducts);