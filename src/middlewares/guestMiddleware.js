function guestsMiddleware(req, res, next) {

    if (req.session.userLogged) {
        return res.redirect('/user/profile');

    }
    console.log(req.session.userLogged)
    next();
}
module.exports = guestsMiddleware;
