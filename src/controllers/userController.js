const express = require('express');

const controller = {
register:  (req, res)=>{
    res.render('register')
},
addUser: (req, res) => {
    const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
    const users = JSON.parse(usersJSON);

    const newUser = {
        id: users[users.length - 1].id + 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        image: '/img/' + req.file.filename,
        email: req.body.email,
        password: req.body.password,
    };

    newUser.price = Number(newUser.price);
    users.push(newUser);

    const newListUsers = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, "../data/user.json"), newListUsers, "utf-8");

    res.redirect('/users')

},

login: (req, res)=>{
    res.render('login')
},

productCart: (req, res)=>{
    res.render('productCart')
}

}

module.exports = controller;


