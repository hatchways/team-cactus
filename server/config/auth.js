module.exports = {
    ensureAuthenticatedWithRedirect: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    ensureAuthenticatedRest: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.sendStatus(401)
    }
}