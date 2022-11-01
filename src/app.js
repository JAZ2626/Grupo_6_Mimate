const express = require ('express');
const path = require ('path');
const routerMain = require('./routers/main');
const routerUser = require('./routers/user');
const routerProducts = require('./routers/products');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
//const morgan = require('morgan');


app.set('view engine','ejs');
app.set("views", [
    path.join(__dirname, './views/users'),
    path.join(__dirname, './views/products'),
]);


app.listen(3030, ()=>{
    console.log(" ");
});
//app.use(morgan("tiny"));

app.use(session({ 
    secret: "Shhh, it's a secret",
    resave: false,
    saveUninitialized: false,
    }));

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', routerMain);

app.use('/user', routerUser);

app.use('/products', routerProducts);

app.use((req, res, next) => {
    res.status(404).render('index')
  })
