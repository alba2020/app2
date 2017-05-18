
var models = require('./models');

module.exports.setUser = (req, res, next) => {

    if (req.session && req.session.userId) {
        models.User.findById(req.session.userId)
            .then(user => {
                if (user) {
                    req.user = user;
                }
                // finishing processing the middleware and run the route
                next();
            });
    } else {
        next();
    }

}

module.exports.requireLogin = (req, res, next) => {
    if (!req.user) {
        res.send('login required');
    } else {
        next();
    }
};