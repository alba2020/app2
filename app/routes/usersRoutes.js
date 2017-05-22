
var usersController = require('../controllers/usersController.js');

var requireLogin = require('../middleware').requireLogin;

module.exports = (app) => {

    // app.get('/users', requireLogin, usersController.list);

}
