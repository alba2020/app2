
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
        res.status(403).send('login required');
    } else {
        next();
    }
};

module.exports.resourceRequiresLogin = (req, res, context) => {
    if ( req.user ) {
        return context.continue;
    } else {
        return res.status(401).send({message: "Unauthorized"});
    }
}

module.exports.adminRequired = (req, res, context) => {
    if (!(req.user && req.user.isAdmin)) {
        return context.error(403, "forbidden");
    }
    return context.continue;
}

module.exports.adminRequiredEx = (req, res, next) => {
    if (!(req.user && req.user.isAdmin)) {
        return res.status(403).send("forbidden");
    }
    next();
}