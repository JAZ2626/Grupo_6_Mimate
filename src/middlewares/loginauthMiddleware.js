function loginAuthMiddleware(req, res, next) {

    if (!req.session.userLogged) {
        return res.redirect('/user/login');
    }
    next();
}
module.exports = loginAuthMiddleware;