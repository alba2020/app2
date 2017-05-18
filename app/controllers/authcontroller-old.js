
var exports = module.exports = {}
 
exports.signup = (req, res) => {
    res.render('signup');
}

exports.signin = (req, res) => {
    res.render('signin');
}

exports.dashboard = function(req, res) {
    res.render('dashboard');
}

exports.logout = function(req, res) {
     req.session.destroy(function(err) {
         res.redirect('/');
     });
}
