
const bCrypt = require('bcrypt-nodejs');
const models = require("../models");

var exports = module.exports = {}

var generateHash = (pass) => {
    return bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);
};


exports.signup = (req, res) => {

    var username = req.body.username;
    var password = req.body.password;

    models.LocalUser.findOne({
        where: {
            username: username
        }
    }).then(localUser => {
        if (localUser) {
            return res.send('username already taken');
        } else {
            models.User.create({
                fullname: username,
                isAdmin: false
            }).then( user => {
                return models.LocalUser.create({
                    username: username,
                    password: generateHash(password),
                    UserId: user.id
                })
            }).then(localUser => {
                //return res.send('new user created: ' + localUser.username);
                return exports.login(req, res);
            });

        }
    }).catch(e => console.log(e));

}

exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    models.LocalUser.findOne({
        where: { username: username }
    }).then(localUser => {
        if(localUser) {
            if (bCrypt.compareSync(password, localUser.password)) {
                return models.User.findById(localUser.UserId).then(u => {
                    req.session.userId = u.id;
                    return res.send('logged in as ' + u.fullname);
                })
            } else {
                return res.send('username or password invalid');    
            }
        } else {
            return res.send('username or password invalid');
        }
    }).catch(e => console.log(e));

}

exports.logout = (req, res) => {
     req.session.destroy();
     return res.send('logged out');
}

exports.check = (req, res) => {
    if(req.user) {
        return res.json(req.user);
    } else {
        return res.send('You are not logged in');
    }
}