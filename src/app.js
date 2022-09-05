const express = require ('express');
const path = require ('path');
const routerMain = require('./routers/main');
const routerUser = require('./routers/user');
const routerProducts = require('./routers/products');
const app = express();

app.set('view engine','ejs');
app.search('views', 'src/views');

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
<<<<<<< HEAD
app.use('/products', routerProducts);
=======
app.use('/products', routerProducts);

>>>>>>> 10a11cccd50053c05f2c5307af098c4cbc060a24
