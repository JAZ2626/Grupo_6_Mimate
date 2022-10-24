const fs = require('fs');
const path = require('path');

const authMiddleware = {
checkPassword: function(req, res, next){
    const user = req.body;
    const usersJSON = fs.readFileSync(path.join(__dirname, "../data/user.json"), "utf-8");
const users = JSON.parse(usersJSON);
const reqUser = users.find(actualUser => actualUser.email === user.email);
if(reqUser.password === user.password){
    next();
}else{
    res.send("La contraseña es incorrectaaa");
}
const isCorrect = bcrypt.compareSync(user.password, reqUser.password);

if(isCorrect){
    res.send("La contraseña es correcta");
}else{
    res.send("La contraseña es incorrecta");
}

}  
}
module.exports = authMiddleware;
