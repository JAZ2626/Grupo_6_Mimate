const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const authMiddleware = {
checkPassword: function(req, res, next){
    const user = req.body;
    console.log(user);
    const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
const users = JSON.parse(usersJSON);
const reqUser = users.find(actualUser => actualUser.email === user.email);
const isCorrect = bcrypt.compareSync(user.password, reqUser.password);

if(!isCorrect){
    res.send("La contraseña es incorrecta");
}else{
   next();
}

}  
}
module.exports = authMiddleware;
